# ItpHomeGarden

This repository is an integrated [Nx monorepo](https://nx.dev/) containing:

- `apps/api` – the backend API
- `apps/web` – the Angular frontend
- `apps/web-e2e` – Playwright end-to-end smoke tests for the frontend
- `libs/schemas` and `libs/api-interfaces` – schemas and types shared by the backend and the frontend

## Prerequisites

You have Node.js installed on your machine and ran:

```sh
npm install
```

## Run backend

To run the backend, use this command:

```sh
npx nx dev api
```

Once it's running, you can check out the API specs at http://localhost:3000/docs

## Run frontend

With the backend running, start the frontend with:

```sh
npx nx serve web
```

The app is served at http://localhost:4200. Requests to `/api` are proxied to the backend at http://localhost:3000 (see `apps/web/proxy.config.json`).

## Tests

Run the frontend unit tests:

```sh
npx nx test web
```

Run the end-to-end tests (Playwright starts the backend and the frontend automatically, reusing them if they're already running):

```sh
npx nx e2e web-e2e
```

## Architectural decisions

### Monorepo

- **Integrated Nx monorepo.** The workspace was converted from a package-based to an integrated Nx monorepo when the Angular app was added. A full conversion probably wasn't strictly required, but the integrated layout is the default for Nx Angular projects, so converting keeps the setup aligned with Nx conventions and generators.
- **Application logic stays in the apps.** The project is small and isn't expected to grow much, so splitting it into libraries would add overhead without real benefit. Features are built as isolated modules, so any of them can be extracted into a library later with little effort.
- **Libraries contain only code shared between the backend and the frontend:**
  - `libs/schemas` – the Zod schemas, moved out of the `api` app so both sides validate against the same definitions.
  - `libs/api-interfaces` – TypeScript types generated from those schemas (`z.infer`), so request and response types can't drift from the validation rules.

### Web app structure

`apps/web/src/app` is split into four areas:

- **`core`** – Application-specific code: the shell template, error pages, the services that define navigation, and the retry interceptor.
- **`modules`** – The business logic, grouped by feature. Pages are deliberately kept out of here: a page's UI often pulls from several features, which would create dependencies between modules and break their isolation.
- **`pages`** – The routed pages. They compose components from `modules` and should contain as little UI of their own as possible.
- **`shared`** – Common building blocks used throughout the app. It must not import from `core`, `modules` or `pages`.

### Navigation contracts

Modules never hard-code routes or import from `core` to navigate. Instead, each module declares the navigation it needs as an interface plus an injection token, for example `GardenNavigation` / `GARDEN_NAVIGATION` in `modules/garden/garden.navigation.ts`. Navigation shared by every module (`notFound()`, `broken()`) lives in `CommonNavigation` (`shared/navigation`).

`AppNavigationService` in `core` implements all of these interfaces and is the only place that knows the actual URLs. `app.config.ts` binds each module's token to it:

```ts
{ provide: GARDEN_NAVIGATION, useExisting: AppNavigationService },
{ provide: PLANT_NAVIGATION, useExisting: AppNavigationService },
```

This keeps modules decoupled from the app's routing: a module can be moved or reused elsewhere by providing a different implementation of its navigation token.

### Data layer

- **CRUD API services.** Client API services extend `CrudApiService` (`shared/api/crud`), which provides reusable get/create/update operations, so each resource service only adds what is specific to it.
- **API stores** (`shared/api/stores`) serve two purposes:
  - They apply SWR caching to API data.
  - They let route resolvers and in-page data refreshes share the same state, so data can be refreshed without reloading the route (and re-running its resolvers).
- **Route-scoped stores.** Stores are not app-wide singletons: they're registered in each route's `providers` in `app.routes.ts`, so every route gets its own instance and pages only see the stores their route provides. Angular keeps route-level injectors alive after the route is left, so the same instance is reused on the next visit. That's why resolvers reset the store before loading: a page never briefly shows data from a previous visit (for example, another garden's details).
- **Route resolvers instead of fetching in components.** Data is loaded by resolvers before navigation completes, instead of being fetched and stored by the page components. This was chosen because:
  - It gives a better UX: pages render with their data already available, so no skeleton states are needed. A global loading indicator shows that the app is changing routes.
  - It makes a future SSR implementation easier, should one be wanted, which would improve the UX further.
- **Error handling while loading data:**
  - **In resolvers** – the common `handleStoreResolve` helper (`shared/navigation/store-resolver.utils.ts`) logs the failure and redirects: a `404` goes to the not-found page, any other error goes to the broken page. The target URLs come from the module's navigation contract.
  - **When a refresh fails but cached data exists** – the stale data is kept on screen and a snackbar tells the user it couldn't be updated, with a **Retry** action that reloads the store.
- **SWR caching** (`shared/api/swr`). A standard stale-while-revalidate implementation with two timers. While an entry is _fresh_, it's served straight from the cache. Once it's _stale_, it's still served from the cache but revalidated in the background. After the maximum stale time it's discarded and fetched again. Caching goes through a global service with a configurable storage provider; the default is IndexedDB.
- **Retry policy** (`core/api/retry-interceptor.ts`). An HTTP interceptor retries failed requests, but only when it's safe and useful:
  - Only idempotent methods (`GET`, `PUT`, `DELETE`) are retried. `POST` is never retried, so a create can't be submitted twice.
  - Only transient errors (`5xx` and `408 Request Timeout`) are retried. Client errors such as `400` or `404` fail immediately.
  - Retries use a linear backoff (1s × attempt number), up to `RETRY_COUNT` attempts (3 by default). A request that still fails is logged as a warning and the error is passed on.

### Logging

Logging goes through a custom logger (`shared/log`) that sends entries to pluggable transports. Only a console transport exists for now. A real production application should use an established solution instead, such as Sentry, Datadog or Bugsnag.

### Configuration

**Injection tokens with defaults.** Configurable behavior is exposed through Angular injection tokens. Most tokens provide a working default through a `providedIn: 'root'` factory, so the app only overrides what it needs. Overrides live in `app.config.ts` and use `satisfies TokenType<typeof TOKEN>` (`shared/injection`), so a wrong value type is a compile error.

| Token                                   | Defined in                      | Default                                    |
| --------------------------------------- | ------------------------------- | ------------------------------------------ |
| `API_BASE_PATH`                         | `shared/api/api.const.ts`       | None – must be provided (from environment) |
| `API_STORE_CACHE_DURATION`              | `shared/api/stores`             | Fresh for 30s, stale for up to 5 minutes   |
| `API_SWP_PROVIDER`                      | `shared/api/swr`                | IndexedDB (`SwrIdbKeyvalProvider`)         |
| `LOG_LEVEL`                             | `shared/log/logger.service.ts`  | `Debug` (overridden from environment)      |
| `LOG_TRANSPORTS`                        | `shared/log/logger.service.ts`  | Console transport                          |
| `RETRY_COUNT`                           | `core/api/retry-interceptor.ts` | 3                                          |
| `GARDEN_NAVIGATION`, `PLANT_NAVIGATION` | `modules/*/*.navigation.ts`     | None – bound to `AppNavigationService`     |

**Environments** (`apps/web/environments`). `environment.base.ts` defines the `Environment` interface and the default values. Each environment file spreads the base and overrides only what differs: `environment.ts` is used for development, and `environment.prod.ts` replaces it in production builds through `fileReplacements` in `apps/web/rspack.config.ts`. Environment values reach the app only through the tokens above (`API_BASE_PATH`, `LOG_LEVEL`), so no code outside `app.config.ts` reads the environment directly.

### General principles

The architecture and implementation follow two preferences:

- **Configurable outside `core`.** Anything defined outside the `core` folder should be configurable rather than tied to this app, which keeps it decoupled and isolated.
- **Reuse over duplication**, even for small pieces of code.

### AI-generated parts

The following parts were generated by AI agents:

- E2E smoke tests
- Some of the UI components
- The Nx migration from package-based to integrated
- Most of this README's updates (written by an AI agent from my notes)
- Date utils functions

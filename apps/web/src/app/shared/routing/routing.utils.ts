const PARAM_RE = /:([A-Za-z_][A-Za-z0-9_]*)/g;

function getRouteParams(route: string): string[] {
  return [...route.matchAll(PARAM_RE)].map((m) => m[1]);
}

export function buildRoute(paths: string[], variables: Record<string, string>) {
  return paths.map((path): string => {
    const params: string[] = getRouteParams(path);

    return params.reduce(
      (acc: string, param: string): string => acc.replace(`:${param}`, variables[param]),
      path,
    );
  });
}

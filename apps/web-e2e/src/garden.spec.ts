import { APIRequestContext, APIResponse, expect, Locator, Page, test } from '@playwright/test';

interface GardenSummary {
  gardenId: number;
}

interface GardenFormValues {
  gardenName: string;
  totalSurfaceArea: string;
  locationDescription: string;
  latitude: string;
  longitude: string;
}

const created: GardenFormValues = {
  gardenName: 'E2E Backyard',
  totalSurfaceArea: '120',
  locationDescription: 'Behind the house',
  latitude: '44.43',
  longitude: '26.1',
};

const updated: GardenFormValues = {
  ...created,
  gardenName: 'E2E Orchard',
  totalSurfaceArea: '150',
  locationDescription: 'Near the river',
};

/** Removes leftovers (e.g. from a failed run in another browser project) so the garden-list starts empty. */
async function deleteAllGardens(request: APIRequestContext): Promise<void> {
  const response: APIResponse = await request.get('/api/gardens');
  expect(response.ok()).toBe(true);

  const gardens: GardenSummary[] = (await response.json()) as GardenSummary[];

  for (const garden of gardens) {
    const deleted: APIResponse = await request.delete(`/api/gardens/${garden.gardenId}`);
    expect(deleted.ok()).toBe(true);
  }
}

function emptyState(page: Page): Locator {
  return page.getByRole('heading', { name: 'No gardens yet' });
}

function gardenLink(page: Page, name: string): Locator {
  return page.getByRole('link', { name, exact: true });
}

async function fillAndSaveGardenForm(page: Page, values: GardenFormValues): Promise<void> {
  const dialog: Locator = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  for (const [label, value] of Object.entries(values) as [keyof GardenFormValues, string][]) {
    await dialog.getByLabel(label, { exact: true }).fill(value);
  }

  await dialog.getByRole('button', { name: 'Save' }).click();
  await expect(dialog).toBeHidden();
}

async function expectGardenDetails(page: Page, values: GardenFormValues): Promise<void> {
  await expect(page).toHaveURL(/\/gardens\/\d+$/);
  await expect(page.getByRole('heading', { level: 1, name: values.gardenName })).toBeVisible();
  await expect(page.getByText(`${values.totalSurfaceArea} m²`)).toBeVisible();
  await expect(page.getByText(values.locationDescription)).toBeVisible();
}

test.beforeEach(async ({ request }) => {
  await deleteAllGardens(request);
});

test('creates, views, edits and deletes a garden', async ({ page }) => {
  // List starts empty
  await page.goto('/gardens');
  await expect(emptyState(page)).toBeVisible();

  // Create
  await page.getByRole('button', { name: 'Create garden' }).click();
  await fillAndSaveGardenForm(page, created);
  await expect(gardenLink(page, created.gardenName)).toBeVisible();
  await expect(emptyState(page)).toBeHidden();

  // Survives a reload
  await page.reload();
  await expect(gardenLink(page, created.gardenName)).toBeVisible();

  // Item page
  await gardenLink(page, created.gardenName).click();
  await expectGardenDetails(page, created);

  // Edit (the item page is read-only, so editing happens from the garden-list)
  await page.getByRole('link', { name: 'Back to gardens' }).click();
  await page.getByRole('button', { name: `Edit ${created.gardenName}` }).click();
  await fillAndSaveGardenForm(page, updated);
  await expect(gardenLink(page, updated.gardenName)).toBeVisible();
  await expect(gardenLink(page, created.gardenName)).toBeHidden();

  // The item page reflects the edit
  await gardenLink(page, updated.gardenName).click();
  await expectGardenDetails(page, updated);
  await page.getByRole('link', { name: 'Back to gardens' }).click();

  // Delete
  await page.getByRole('button', { name: `Delete ${updated.gardenName}` }).click();
  await expect(emptyState(page)).toBeVisible();

  // Still empty after a reload
  await page.reload();
  await expect(emptyState(page)).toBeVisible();
  await expect(gardenLink(page, updated.gardenName)).toBeHidden();
});

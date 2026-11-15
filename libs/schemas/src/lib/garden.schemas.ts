import z from 'zod';

export const gardenIdParamsSchema = z.object({
  gardenId: z.coerce.number().int().positive('GardenModel ID must be a positive integer'),
});
export const createGardenSchema = z
  .object({
    gardenName: z.string().min(1, 'GardenModel name is required').trim(),
    totalSurfaceArea: z.number().nonnegative('Total surface area must be a non-negative number'),
    locationDescription: z.string().nullable().optional(),
    latitude: z
      .number()
      .min(-90, 'Latitude must be between -90 and 90')
      .max(90, 'Latitude must be between -90 and 90')
      .nullable()
      .optional(),
    longitude: z
      .number()
      .min(-180, 'Longitude must be between -180 and 180')
      .max(180, 'Longitude must be between -180 and 180')
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      const hasLat = data.latitude !== null && data.latitude !== undefined;
      const hasLng = data.longitude !== null && data.longitude !== undefined;
      // Both must be provided together or neither
      return hasLat === hasLng;
    },
    {
      message: 'Both latitude and longitude must be provided together',
    },
  );
export const updateGardenSchema = createGardenSchema;
export const gardenResponseSchema = createGardenSchema.safeExtend({
  gardenId: z.number(),
  createdAt: z.coerce.string(),
  updatedAt: z.coerce.string(),
});
export const gardensResponseSchema = z.array(gardenResponseSchema);

z.globalRegistry.add(gardenIdParamsSchema, { id: 'GardenId' });
z.globalRegistry.add(createGardenSchema, { id: 'CreateGarden' });
z.globalRegistry.add(updateGardenSchema, { id: 'UpdateGarden' });
z.globalRegistry.add(gardenResponseSchema, { id: 'GardenModel' });
z.globalRegistry.add(gardensResponseSchema, { id: 'Gardens' });

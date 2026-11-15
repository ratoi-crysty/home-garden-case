import type { z } from 'zod';
import type {
  createPlantSchema,
  plantResponseSchema,
  updatePlantSchema,
} from '@itp-home-garden/schemas';

export type CreatePlantRequest = z.infer<typeof createPlantSchema>;
export type UpdatePlantRequest = z.infer<typeof updatePlantSchema>;
export type PlantModel = z.infer<typeof plantResponseSchema>;

import { z } from 'zod';
import { createGardenSchema, gardenResponseSchema, updateGardenSchema } from '../../../schemas/src';

export type CreateGardenRequest = z.infer<typeof createGardenSchema>;
export type UpdateGardenRequest = z.infer<typeof updateGardenSchema>;
export type GardenModel = z.infer<typeof gardenResponseSchema>;

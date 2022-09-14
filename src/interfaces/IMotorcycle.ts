import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const motorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().positive().max(2500),
});

type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export { IMotorcycle, motorcycleZodSchema };

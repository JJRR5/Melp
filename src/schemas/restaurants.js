import z from 'zod';

const restaurantSchema = z.object({
   name: z
      .string({
         invalid_type_error: 'name must be a string',
         required_error: 'name is required',
      })
      .min(1)
      .max(255),
   rating: z
      .number({
         invalid_type_error: 'rating must be a number',
         required_error: 'rating is required',
      })
      .int()
      .min(0)
      .max(4),
   site: z.string({
      invalid_type_error: 'site must be a valid URL',
   }),
   email: z.string().email({
      invalid_type_error: 'email must be a valid email',
   }),
   phone: z.string({
      invalid_type_error: 'phone must be a string',
   }),
   street: z.string({
      invalid_type_error: 'street must be a string',
   }),
   city: z.string({
      invalid_type_error: 'city must be a string',
   }),
   state: z.string({
      invalid_type_error: 'state must be a string',
   }),
   lat: z.number({
      invalid_type_error: 'lat must be a number',
      required_error: 'lat is required',
   }),
   lng: z.number({
      invalid_type_error: 'lng must be a number',
      required_error: 'lng is required',
   }),
});

const statsSchema = z.object({
   latitude: z
      .string()
      .transform(parseFloat)
      .refine((value) => !isNaN(value), {
         message: 'lat must be a number',
      }),
   longitude: z
      .string()
      .transform(parseFloat)
      .refine((value) => !isNaN(value), {
         message: 'lng must be a number',
      }),
   radius: z
      .string()
      .transform(parseFloat)
      .refine((value) => !isNaN(value), {
         message: 'radius must be a number',
      }),
});
export function validateRestaurant(input) {
   return restaurantSchema.safeParse(input);
}

export function validatePartialRestaurant(input) {
   return restaurantSchema.partial().safeParse(input);
}

export function validateStats(input) {
   return statsSchema.safeParse(input);
}

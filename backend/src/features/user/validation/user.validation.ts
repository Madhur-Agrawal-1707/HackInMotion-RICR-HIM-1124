import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long').optional(),
  }),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>['body'];

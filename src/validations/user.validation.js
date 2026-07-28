import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
  }),
});

export const updateRoleSchema = z.object({
  body: z.object({
    role: z.enum(['USER', 'ADMIN', 'MODERATOR']),
  }),
  params: z.object({
    id: z.string().uuid('Invalid user ID'),
  }),
});
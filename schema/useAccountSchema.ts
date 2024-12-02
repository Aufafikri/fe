import { z } from "zod";

export const editProfileNameSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(16, "Name must be at most 16 characters")
    .regex(
      /^[a-zA-z0-9\s_]+$/,
      "Name can only contain letters, numbers, and underscores"
    ),
});

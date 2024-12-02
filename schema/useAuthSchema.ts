import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(4, "Name must be at least 4 characters")
      .max(12, "Name must be at most 12 characters")
      .regex(
        /^[a-zA-z0-9_]+$/,
        "Name can only contain letters, numbers, and underscores"
      ),
    email: z.string().email(),
    password: z.string().min(8, "password must be 8 characters"),
    confirmPassword: z.string().min(8, "confirm password must be 8 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "password must be 8 characters"),
    confirmPassword: z.string().min(8, "confirm password must be 8 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "password do not match",
        path: ["confirmPassword"],
      });
    }
  });

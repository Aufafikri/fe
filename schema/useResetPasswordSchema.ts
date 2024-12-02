import { z } from "zod";

export const resetPasswordSchema = z.object({
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
})
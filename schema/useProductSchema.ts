import { z } from "zod";

const categorySchema = z.object({
    name: z.string().min(1, "name must be at least 1 characters").max(30, "name must be at most 30 characters"),
    label: z.string(),
    type: z.string().optional(),
    size: z.string().min(1).max(5).optional(),
    brand: z.string().optional(),
    description: z.string().optional()
});

export const createProductSchema = z.object({
    name: z.string().min(1, "name must be at least 1 characters").max(30, "name must be at most 30 characters"),
    description: z.string().min(1).max(200),
    price: z.string(),
    stock: z.string(),
    image: z.array(z.instanceof(File)),
    category: categorySchema
})
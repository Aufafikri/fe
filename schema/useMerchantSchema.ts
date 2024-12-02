import { z } from "zod";

const MAX_FILE_SIZE = 1000000; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "image/webp",
];

export const merchantSchema = z.object({
  storeName: z
    .string()
    .min(4, "store name must be at least 4 characters")
    .max(12, "store name must be at most 12 characters"),
  storeDescription: z
    .string()
    .min(10, "store description must be at least 10 characters")
    .max(200, "store name must be at most 200 characters"),
  image: z
    .any()
    // .refine((file) => file instanceof File && file.size < 5000000, {
    //   message: "image must be less than 5MB",
    // })
    .optional()
    .nullable(),
});

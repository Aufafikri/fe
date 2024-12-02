import { z } from "zod";

export const addressShema = z.object({
  country: z.string().min(1, "Negara diperlukan"),
  province: z.string().min(1, "Provinsi diperlukan"),
  city: z.string().min(1, "Kota diperlukan"),
  district: z.string().min(1, "Kecamatan diperlukan"),
  subdistrict: z.string().min(1, "Kelurahan diperlukan"),
  zipCode: z.string().min(1).max(5),
  street: z.string().min(1).regex(
    /^[a-zA-z0-9_]+$/,
    "Street can only contain letters, numbers, and underscores"
  ),
  description: z
    .string()
    .max(200, "description should not exceed 200 characters")
    .regex(
      /^[a-zA-z0-9_]+$/,
      "Description can only contain letters, numbers, and underscores"
    ),
});

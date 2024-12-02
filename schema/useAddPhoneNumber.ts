import { z } from 'zod'

export const phoneNumberSchema = z.object({
    phoneNumber: z.string().min(1, "phone must be 1 digit numbers")
})
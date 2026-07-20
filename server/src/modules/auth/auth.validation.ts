import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email()
        .trim(),

    password: z
        .string()
        .min(8)
        .max(100),
});

export type LoginDto = z.infer<typeof loginSchema>;
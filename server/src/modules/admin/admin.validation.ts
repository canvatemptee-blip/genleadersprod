import { z } from "zod";

export const createStaffSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2)
        .max(100),

    email: z
        .string()
        .trim()
        .email(),

    password: z
        .string()
        .min(8)
        .max(100),

    role: z.enum([
        "admin",
        "manager",
        "intern",
    ]),
});

export const updateStaffRoleSchema = z.object({
    role: z.enum([
        "admin",
        "manager",
        "intern",
    ]),
});

export const updateStaffStatusSchema = z.object({
    is_active: z.boolean(),
});

export type CreateStaffDto =
    z.infer<typeof createStaffSchema>;

export type UpdateStaffRoleDto =
    z.infer<typeof updateStaffRoleSchema>;

export type UpdateStaffStatusDto =
    z.infer<typeof updateStaffStatusSchema>;
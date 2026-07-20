import { z } from "zod";

export const createCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters.")
        .max(100, "Category name cannot exceed 100 characters."),

    slug: z
        .string()
        .trim()
        .min(2, "Slug must be at least 2 characters.")
        .max(120)
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers and hyphens.",
        ),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
import {
    z,
} from "zod";


const articleStatusSchema =
    z.enum([
        "draft",
        "scheduled",
        "published",
        "archived",
    ]);


const articleFields = {
    title: z
        .string()
        .trim()
        .min(5)
        .max(255),

    slug: z
        .string()
        .trim()
        .min(5)
        .max(255)
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers and hyphens.",
        ),

    excerpt: z
        .string()
        .trim()
        .min(10),

    content:
        z.unknown(),

    cover_image: z
        .string()
        .url()
        .nullable()
        .optional(),

    category_id: z
        .number()
        .int()
        .positive(),

    reading_time: z
        .number()
        .int()
        .positive(),

    is_featured: z
        .boolean()
        .default(false),

    status:
        articleStatusSchema,

    scheduled_at: z
        .string()
        .datetime({
            offset: true,
        })
        .nullable()
        .optional(),
};


function validateSchedule(
    data: {
        status?:
        z.infer<
            typeof articleStatusSchema
        >;

        scheduled_at?:
        string | null;
    },

    ctx:
        z.RefinementCtx,
) {
    if (
        data.status !==
        "scheduled"
    ) {
        return;
    }


    if (
        !data.scheduled_at
    ) {
        ctx.addIssue({
            code:
                "custom",

            path: [
                "scheduled_at",
            ],

            message:
                "Scheduled date and time are required for scheduled articles.",
        });

        return;
    }


    const scheduledAt =
        new Date(
            data.scheduled_at,
        );


    if (
        scheduledAt <=
        new Date()
    ) {
        ctx.addIssue({
            code:
                "custom",

            path: [
                "scheduled_at",
            ],

            message:
                "Scheduled date and time must be in the future.",
        });
    }
}


export const createArticleSchema =
    z
        .object(
            articleFields,
        )
        .superRefine(
            validateSchedule,
        );


export const updateArticleSchema =
    z
        .object(
            articleFields,
        )
        .partial()
        .superRefine(
            validateSchedule,
        );


export type CreateArticleDto =
    z.infer<
        typeof createArticleSchema
    >;


export type UpdateArticleDto =
    z.infer<
        typeof updateArticleSchema
    >;
import {
    Router,
} from "express";

import categoryRoutes
    from "../modules/category/category.routes.js";

import authRoutes
    from "../modules/auth/auth.routes.js";

import articleRoutes
    from "../modules/article/article.routes.js";

import adminRoutes
    from "../modules/admin/admin.routes.js";

import newsletterRoutes
    from "../modules/newsletter/newsletter.routes.js";

import healthRoutes
    from "../modules/health/health.routes.js";


const router =
    Router();


router.use(
    "/health",
    healthRoutes,
);


router.use(
    "/categories",
    categoryRoutes,
);


router.use(
    "/auth",
    authRoutes,
);


router.use(
    "/articles",
    articleRoutes,
);


router.use(
    "/admin",
    adminRoutes,
);


router.use(
    "/newsletter",
    newsletterRoutes,
);


export default router;
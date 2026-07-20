import {
    BrowserRouter,
    Link,
    Route,
    Routes,
} from "react-router-dom";

import {
    ROUTES,
} from "@/config/routes";


import MainLayout
    from "@/shared/layout/MainLayout";


import HomePage
    from "@/features/home/pages/HomePage";

import ArticlesPage
    from "@/features/articles/pages/ArticlesPage";

import ArticlePage
    from "@/features/articles/pages/ArticlePage";

import AboutPage
    from "@/features/about/pages/AboutPage";


import NewsletterVerifyPage
    from "@/features/newsletter/pages/NewsletterVerifyPage";

import NewsletterUnsubscribePage
    from "@/features/newsletter/pages/NewsletterUnsubscribePage";


import AdminLoginPage
    from "@/features/auth/pages/AdminLoginPage";

import ProtectedRoute
    from "@/features/auth/components/ProtectedRoute";

import PermissionRoute
    from "@/features/auth/components/PermissionRoute";


import AdminLayout
    from "@/features/admin/layout/AdminLayout";

import AdminDashboardPage
    from "@/features/admin/pages/AdminDashboardPage";

import AdminArticlesPage
    from "@/features/admin/pages/AdminArticlesPage";

import AdminCreateArticlePage
    from "@/features/admin/pages/AdminCreateArticlePage";

import AdminEditArticlePage
    from "@/features/admin/pages/AdminEditArticlePage";

import AdminCategoriesPage
    from "@/features/admin/pages/AdminCategoriesPage";

import AdminNewsletterPage
    from "@/features/admin/pages/AdminNewsletterPage";

import AdminStaffPage
    from "@/features/admin/pages/AdminStaffPage";


export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public website */}

                <Route
                    element={
                        <MainLayout />
                    }
                >
                    <Route
                        index
                        element={
                            <HomePage />
                        }
                    />


                    <Route
                        path={
                            ROUTES.ARTICLES
                        }
                        element={
                            <ArticlesPage />
                        }
                    />


                    <Route
                        path={`${ROUTES.ARTICLES}/:slug`}
                        element={
                            <ArticlePage />
                        }
                    />


                    <Route
                        path={
                            ROUTES.ABOUT
                        }
                        element={
                            <AboutPage />
                        }
                    />
                </Route>


                {/* Newsletter public actions */}

                <Route
                    path={
                        ROUTES.NEWSLETTER_VERIFY
                    }
                    element={
                        <NewsletterVerifyPage />
                    }
                />


                <Route
                    path={
                        ROUTES.NEWSLETTER_UNSUBSCRIBE
                    }
                    element={
                        <NewsletterUnsubscribePage />
                    }
                />


                {/* Authentication */}

                <Route
                    path={
                        ROUTES.ADMIN_LOGIN
                    }
                    element={
                        <AdminLoginPage />
                    }
                />


                {/* Protected administration */}

                <Route
                    element={
                        <ProtectedRoute />
                    }
                >
                    <Route
                        element={
                            <AdminLayout />
                        }
                    >
                        {/* Dashboard */}

                        <Route
                            path={
                                ROUTES.ADMIN
                            }
                            element={
                                <AdminDashboardPage />
                            }
                        />


                        {/* Articles */}

                        <Route
                            path={
                                ROUTES.ADMIN_ARTICLES
                            }
                            element={
                                <AdminArticlesPage />
                            }
                        />


                        <Route
                            path={
                                ROUTES.ADMIN_ARTICLE_NEW
                            }
                            element={
                                <AdminCreateArticlePage />
                            }
                        />


                        <Route
                            path={
                                ROUTES.ADMIN_ARTICLE_EDIT(
                                    ":id",
                                )
                            }
                            element={
                                <AdminEditArticlePage />
                            }
                        />


                        {/* Category management */}

                        <Route
                            element={
                                <PermissionRoute
                                    permission="category:manage"
                                />
                            }
                        >
                            <Route
                                path={
                                    ROUTES.ADMIN_CATEGORIES
                                }
                                element={
                                    <AdminCategoriesPage />
                                }
                            />
                        </Route>


                        {/* Newsletter management */}

                        <Route
                            element={
                                <PermissionRoute
                                    permission="newsletter:manage"
                                />
                            }
                        >
                            <Route
                                path={
                                    ROUTES.ADMIN_NEWSLETTER
                                }
                                element={
                                    <AdminNewsletterPage />
                                }
                            />
                        </Route>


                        {/* Staff management */}

                        <Route
                            element={
                                <PermissionRoute
                                    permission="staff:manage"
                                />
                            }
                        >
                            <Route
                                path={
                                    ROUTES.ADMIN_STAFF
                                }
                                element={
                                    <AdminStaffPage />
                                }
                            />
                        </Route>
                    </Route>
                </Route>


                {/* Not found */}

                <Route
                    path="*"
                    element={
                        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                            <div className="text-center">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                                    Page Not Found
                                </p>


                                <h1 className="mt-3 text-7xl font-bold text-[#06154A]">
                                    404
                                </h1>


                                <p className="mt-4 text-lg text-slate-600">
                                    The page you're looking
                                    for doesn't exist.
                                </p>


                                <Link
                                    to={
                                        ROUTES.HOME
                                    }
                                    className="mt-8 inline-flex rounded-full bg-[#06154A] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                                >
                                    Go Home
                                </Link>
                            </div>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
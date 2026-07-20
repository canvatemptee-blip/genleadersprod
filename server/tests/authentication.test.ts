import request
    from "supertest";

import jwt
    from "jsonwebtoken";

import {
    describe,
    expect,
    it,
} from "vitest";

import app
    from "../src/app/app.js";

import {
    db,
} from "../src/config/database.js";

import {
    env,
} from "../src/config/env.js";

import {
    createAdminFixture,
} from "./helpers/adminFixtures.js";

import {
    loginAs,
} from "./helpers/authHelpers.js";


describe(
    "authentication",
    () => {
        describe(
            "POST /api/auth/login",
            () => {
                it(
                    "logs in with valid credentials",
                    async () => {
                        const admin =
                            await createAdminFixture({
                                role:
                                    "admin",
                            });


                        const response =
                            await request(
                                app,
                            )
                                .post(
                                    "/api/auth/login",
                                )
                                .send({
                                    email:
                                        admin.email,

                                    password:
                                        admin.password,
                                });


                        expect(
                            response.status,
                        ).toBe(
                            200,
                        );


                        expect(
                            response.body.success,
                        ).toBe(
                            true,
                        );


                        expect(
                            response.body.message,
                        ).toBe(
                            "Login successful.",
                        );


                        expect(
                            response.body.data
                                .accessToken,
                        ).toEqual(
                            expect.any(
                                String,
                            ),
                        );


                        expect(
                            response.body.data.user,
                        ).toMatchObject({
                            id:
                                admin.id,

                            name:
                                admin.name,

                            email:
                                admin.email,

                            role:
                                "admin",
                        });
                    },
                );


                it(
                    "rejects an incorrect password",
                    async () => {
                        const admin =
                            await createAdminFixture();


                        const response =
                            await request(
                                app,
                            )
                                .post(
                                    "/api/auth/login",
                                )
                                .send({
                                    email:
                                        admin.email,

                                    password:
                                        "DefinitelyWrong123!",
                                });


                        expect(
                            response.status,
                        ).toBe(
                            400,
                        );


                        expect(
                            response.body,
                        ).toMatchObject({
                            success:
                                false,

                            message:
                                "Invalid email or password.",
                        });
                    },
                );


                it(
                    "rejects an unknown email address",
                    async () => {
                        const response =
                            await request(
                                app,
                            )
                                .post(
                                    "/api/auth/login",
                                )
                                .send({
                                    email:
                                        "missing@genleaders.test",

                                    password:
                                        "TestPassword123!",
                                });


                        expect(
                            response.status,
                        ).toBe(
                            400,
                        );


                        expect(
                            response.body,
                        ).toMatchObject({
                            success:
                                false,

                            message:
                                "Invalid email or password.",
                        });
                    },
                );


                it(
                    "rejects a deactivated account",
                    async () => {
                        const admin =
                            await createAdminFixture({
                                isActive:
                                    false,
                            });


                        const response =
                            await request(
                                app,
                            )
                                .post(
                                    "/api/auth/login",
                                )
                                .send({
                                    email:
                                        admin.email,

                                    password:
                                        admin.password,
                                });


                        expect(
                            response.status,
                        ).toBe(
                            400,
                        );


                        expect(
                            response.body,
                        ).toMatchObject({
                            success:
                                false,

                            message:
                                "This account has been deactivated.",
                        });
                    },
                );
            },
        );


        describe(
            "protected request authentication",
            () => {
                it(
                    "rejects a request without an Authorization header",
                    async () => {
                        const response =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/articles",
                                );


                        expect(
                            response.status,
                        ).toBe(
                            401,
                        );


                        expect(
                            response.body,
                        ).toMatchObject({
                            success:
                                false,

                            message:
                                "Authentication required.",
                        });
                    },
                );


                it(
                    "rejects a malformed bearer token",
                    async () => {
                        const response =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/articles",
                                )
                                .set(
                                    "Authorization",
                                    "Bearer definitely-not-a-jwt",
                                );


                        expect(
                            response.status,
                        ).toBe(
                            401,
                        );


                        expect(
                            response.body,
                        ).toMatchObject({
                            success:
                                false,

                            message:
                                "Invalid or expired token.",
                        });
                    },
                );


                it(
                    "rejects a token signed with the wrong secret",
                    async () => {
                        const admin =
                            await createAdminFixture();


                        const token =
                            jwt.sign(
                                {
                                    sub:
                                        admin.id,

                                    email:
                                        admin.email,

                                    role:
                                        admin.role,
                                },

                                "wrong-test-secret-that-is-at-least-32-characters",
                                {
                                    expiresIn:
                                        "1h",
                                },
                            );


                        const response =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/articles",
                                )
                                .set(
                                    "Authorization",
                                    `Bearer ${token}`,
                                );


                        expect(
                            response.status,
                        ).toBe(
                            401,
                        );


                        expect(
                            response.body.message,
                        ).toBe(
                            "Invalid or expired token.",
                        );
                    },
                );


                it(
                    "rejects an expired token",
                    async () => {
                        const admin =
                            await createAdminFixture();


                        const token =
                            jwt.sign(
                                {
                                    sub:
                                        admin.id,

                                    email:
                                        admin.email,

                                    role:
                                        admin.role,
                                },

                                env.JWT_SECRET,

                                {
                                    expiresIn:
                                        -1,
                                },
                            );


                        const response =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/articles",
                                )
                                .set(
                                    "Authorization",
                                    `Bearer ${token}`,
                                );


                        expect(
                            response.status,
                        ).toBe(
                            401,
                        );


                        expect(
                            response.body.message,
                        ).toBe(
                            "Invalid or expired token.",
                        );
                    },
                );


                it(
                    "accepts a valid token for an active account",
                    async () => {
                        const admin =
                            await createAdminFixture({
                                role:
                                    "intern",
                            });


                        const token =
                            await loginAs({
                                email:
                                    admin.email,

                                password:
                                    admin.password,
                            });


                        const response =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/articles",
                                )
                                .set(
                                    "Authorization",
                                    `Bearer ${token}`,
                                );


                        expect(
                            response.status,
                        ).toBe(
                            200,
                        );
                    },
                );
            },
        );


        describe(
            "live account state enforcement",
            () => {
                it(
                    "blocks an already-issued token after account deactivation",
                    async () => {
                        const admin =
                            await createAdminFixture({
                                role:
                                    "intern",
                            });


                        const token =
                            await loginAs({
                                email:
                                    admin.email,

                                password:
                                    admin.password,
                            });


                        await db.query(
                            `
                            UPDATE admins
                            SET is_active = FALSE
                            WHERE id = $1
                            `,
                            [
                                admin.id,
                            ],
                        );


                        const response =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/articles",
                                )
                                .set(
                                    "Authorization",
                                    `Bearer ${token}`,
                                );


                        expect(
                            response.status,
                        ).toBe(
                            403,
                        );


                        expect(
                            response.body,
                        ).toMatchObject({
                            success:
                                false,

                            message:
                                "This account has been deactivated.",
                        });
                    },
                );


                it(
                    "uses the current database role instead of the stale JWT role",
                    async () => {
                        const manager =
                            await createAdminFixture({
                                role:
                                    "manager",
                            });


                        const token =
                            await loginAs({
                                email:
                                    manager.email,

                                password:
                                    manager.password,
                            });


                        const beforeRoleChange =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/newsletter",
                                )
                                .set(
                                    "Authorization",
                                    `Bearer ${token}`,
                                );


                        expect(
                            beforeRoleChange.status,
                        ).toBe(
                            200,
                        );


                        await db.query(
                            `
                            UPDATE admins
                            SET role = 'intern'
                            WHERE id = $1
                            `,
                            [
                                manager.id,
                            ],
                        );


                        const afterRoleChange =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/newsletter",
                                )
                                .set(
                                    "Authorization",
                                    `Bearer ${token}`,
                                );


                        expect(
                            afterRoleChange.status,
                        ).toBe(
                            403,
                        );


                        expect(
                            afterRoleChange.body,
                        ).toMatchObject({
                            success:
                                false,

                            message:
                                "You do not have permission to perform this action.",
                        });
                    },
                );
            },
        );
    },
);
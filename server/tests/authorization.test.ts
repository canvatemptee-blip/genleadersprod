import request
    from "supertest";

import {
    describe,
    expect,
    it,
} from "vitest";

import app
    from "../src/app/app.js";

import type {
    AdminRole,
} from "../src/modules/admin/admin.types.js";

import {
    createAdminFixture,
} from "./helpers/adminFixtures.js";

import {
    loginAs,
} from "./helpers/authHelpers.js";


interface RoleSession {
    role:
    AdminRole;

    token:
    string;
}


async function createRoleSession(
    role: AdminRole,
): Promise<RoleSession> {
    const account =
        await createAdminFixture({
            role,
        });


    const token =
        await loginAs({
            email:
                account.email,

            password:
                account.password,
        });


    return {
        role,

        token,
    };
}


function bearer(
    token: string,
) {
    return {
        Authorization:
            `Bearer ${token}`,
    };
}


describe(
    "authorization matrix",
    () => {
        describe(
            "article read permission",
            () => {
                const roles:
                    AdminRole[] = [
                        "admin",
                        "manager",
                        "intern",
                    ];


                for (
                    const role
                    of roles
                ) {
                    it(
                        `allows ${role} to read admin articles`,
                        async () => {
                            const session =
                                await createRoleSession(
                                    role,
                                );


                            const response =
                                await request(
                                    app,
                                )
                                    .get(
                                        "/api/admin/articles",
                                    )
                                    .set(
                                        bearer(
                                            session.token,
                                        ),
                                    );


                            expect(
                                response.status,
                            ).toBe(
                                200,
                            );
                        },
                    );
                }
            },
        );


        describe(
            "article create permission",
            () => {
                const roles:
                    AdminRole[] = [
                        "admin",
                        "manager",
                        "intern",
                    ];


                for (
                    const role
                    of roles
                ) {
                    it(
                        `allows ${role} through article creation authorization`,
                        async () => {
                            const session =
                                await createRoleSession(
                                    role,
                                );


                            const response =
                                await request(
                                    app,
                                )
                                    .post(
                                        "/api/articles",
                                    )
                                    .set(
                                        bearer(
                                            session.token,
                                        ),
                                    )
                                    .send({});


                            expect(
                                response.status,
                            ).not.toBe(
                                403,
                            );


                            expect(
                                response.status,
                            ).toBe(
                                400,
                            );
                        },
                    );
                }
            },
        );


        describe(
            "article delete permission",
            () => {
                const allowedRoles:
                    AdminRole[] = [
                        "admin",
                        "manager",
                    ];


                for (
                    const role
                    of allowedRoles
                ) {
                    it(
                        `allows ${role} through article deletion authorization`,
                        async () => {
                            const session =
                                await createRoleSession(
                                    role,
                                );


                            const response =
                                await request(
                                    app,
                                )
                                    .delete(
                                        "/api/admin/articles/999999",
                                    )
                                    .set(
                                        bearer(
                                            session.token,
                                        ),
                                    );


                            expect(
                                response.status,
                            ).not.toBe(
                                403,
                            );
                        },
                    );
                }


                it(
                    "forbids intern from deleting articles",
                    async () => {
                        const session =
                            await createRoleSession(
                                "intern",
                            );


                        const response =
                            await request(
                                app,
                            )
                                .delete(
                                    "/api/admin/articles/999999",
                                )
                                .set(
                                    bearer(
                                        session.token,
                                    ),
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
                                "You do not have permission to perform this action.",
                        });
                    },
                );
            },
        );


        describe(
            "category management permission",
            () => {
                const allowedRoles:
                    AdminRole[] = [
                        "admin",
                        "manager",
                    ];


                for (
                    const role
                    of allowedRoles
                ) {
                    it(
                        `allows ${role} through category management authorization`,
                        async () => {
                            const session =
                                await createRoleSession(
                                    role,
                                );


                            const response =
                                await request(
                                    app,
                                )
                                    .post(
                                        "/api/categories",
                                    )
                                    .set(
                                        bearer(
                                            session.token,
                                        ),
                                    )
                                    .send({});


                            expect(
                                response.status,
                            ).not.toBe(
                                403,
                            );


                            expect(
                                response.status,
                            ).toBe(
                                400,
                            );
                        },
                    );
                }


                it(
                    "forbids intern from managing categories",
                    async () => {
                        const session =
                            await createRoleSession(
                                "intern",
                            );


                        const response =
                            await request(
                                app,
                            )
                                .post(
                                    "/api/categories",
                                )
                                .set(
                                    bearer(
                                        session.token,
                                    ),
                                )
                                .send({});


                        expect(
                            response.status,
                        ).toBe(
                            403,
                        );
                    },
                );
            },
        );


        describe(
            "newsletter management permission",
            () => {
                const allowedRoles:
                    AdminRole[] = [
                        "admin",
                        "manager",
                    ];


                for (
                    const role
                    of allowedRoles
                ) {
                    it(
                        `allows ${role} to manage newsletter subscribers`,
                        async () => {
                            const session =
                                await createRoleSession(
                                    role,
                                );


                            const response =
                                await request(
                                    app,
                                )
                                    .get(
                                        "/api/admin/newsletter",
                                    )
                                    .set(
                                        bearer(
                                            session.token,
                                        ),
                                    );


                            expect(
                                response.status,
                            ).toBe(
                                200,
                            );
                        },
                    );
                }


                it(
                    "forbids intern from managing newsletter subscribers",
                    async () => {
                        const session =
                            await createRoleSession(
                                "intern",
                            );


                        const response =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/newsletter",
                                )
                                .set(
                                    bearer(
                                        session.token,
                                    ),
                                );


                        expect(
                            response.status,
                        ).toBe(
                            403,
                        );
                    },
                );
            },
        );


        describe(
            "staff management permission",
            () => {
                it(
                    "allows admin to manage staff",
                    async () => {
                        const session =
                            await createRoleSession(
                                "admin",
                            );


                        const response =
                            await request(
                                app,
                            )
                                .get(
                                    "/api/admin/staff",
                                )
                                .set(
                                    bearer(
                                        session.token,
                                    ),
                                );


                        expect(
                            response.status,
                        ).toBe(
                            200,
                        );
                    },
                );


                const deniedRoles:
                    AdminRole[] = [
                        "manager",
                        "intern",
                    ];


                for (
                    const role
                    of deniedRoles
                ) {
                    it(
                        `forbids ${role} from managing staff`,
                        async () => {
                            const session =
                                await createRoleSession(
                                    role,
                                );


                            const response =
                                await request(
                                    app,
                                )
                                    .get(
                                        "/api/admin/staff",
                                    )
                                    .set(
                                        bearer(
                                            session.token,
                                        ),
                                    );


                            expect(
                                response.status,
                            ).toBe(
                                403,
                            );
                        },
                    );
                }
            },
        );


        describe(
            "upload permission",
            () => {
                const roles:
                    AdminRole[] = [
                        "admin",
                        "manager",
                        "intern",
                    ];


                for (
                    const role
                    of roles
                ) {
                    it(
                        `allows ${role} through image upload authorization`,
                        async () => {
                            const session =
                                await createRoleSession(
                                    role,
                                );


                            const response =
                                await request(
                                    app,
                                )
                                    .post(
                                        "/api/uploads/image",
                                    )
                                    .set(
                                        bearer(
                                            session.token,
                                        ),
                                    );


                            expect(
                                response.status,
                            ).not.toBe(
                                403,
                            );
                        },
                    );
                }
            },
        );
    },
);
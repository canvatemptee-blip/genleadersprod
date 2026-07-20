import request
    from "supertest";

import app
    from "../../src/app/app.js";


export interface LoginCredentials {
    email:
    string;

    password:
    string;
}


export async function loginAs(
    credentials:
        LoginCredentials,
): Promise<string> {
    const response =
        await request(
            app,
        )
            .post(
                "/api/auth/login",
            )
            .send(
                credentials,
            );


    if (
        response.status !==
        200
    ) {
        throw new Error(
            [
                "Test login failed.",
                `Status: ${response.status}.`,
                `Response: ${JSON.stringify(response.body)}`,
            ].join(
                " ",
            ),
        );
    }


    const accessToken =
        response.body
            ?.data
            ?.accessToken;


    if (
        typeof accessToken !==
        "string"
    ) {
        throw new Error(
            "Login response did not contain an access token.",
        );
    }


    return accessToken;
}
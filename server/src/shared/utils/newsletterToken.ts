import {
    createHash,
    randomBytes,
} from "node:crypto";


export function createNewsletterToken() {
    const token =
        randomBytes(
            32,
        ).toString(
            "hex",
        );


    return {
        token,

        hash:
            hashNewsletterToken(
                token,
            ),
    };
}


export function hashNewsletterToken(
    token: string,
) {
    return createHash(
        "sha256",
    )
        .update(
            token,
        )
        .digest(
            "hex",
        );
}
import type {
    AdminRole,
    AdminTokenPayload,
} from "@/types/auth";


const TOKEN_KEY =
    "token";


const ADMIN_ROLES:
    AdminRole[] = [
        "admin",
        "manager",
        "intern",
    ];


function decodeBase64Url(
    value: string,
): string {
    const base64 =
        value
            .replace(
                /-/g,
                "+",
            )
            .replace(
                /_/g,
                "/",
            );


    const padded =
        base64.padEnd(
            Math.ceil(
                base64.length /
                4,
            ) * 4,
            "=",
        );


    return atob(
        padded,
    );
}


function isAdminRole(
    value: unknown,
): value is AdminRole {
    return (
        typeof value ===
        "string" &&
        ADMIN_ROLES.includes(
            value as AdminRole,
        )
    );
}


function decodeToken(
    token: string,
): AdminTokenPayload | null {
    try {
        const parts =
            token.split(
                ".",
            );


        if (
            parts.length !==
            3
        ) {
            return null;
        }


        const payload =
            JSON.parse(
                decodeBase64Url(
                    parts[1],
                ),
            ) as Partial<AdminTokenPayload>;


        if (
            typeof payload.sub !==
            "number" ||
            typeof payload.email !==
            "string" ||
            !isAdminRole(
                payload.role,
            ) ||
            typeof payload.iat !==
            "number" ||
            typeof payload.exp !==
            "number"
        ) {
            return null;
        }


        return payload as
            AdminTokenPayload;
    } catch {
        return null;
    }
}


export const authToken = {
    get() {
        return localStorage.getItem(
            TOKEN_KEY,
        );
    },


    set(
        token: string,
    ) {
        localStorage.setItem(
            TOKEN_KEY,
            token,
        );
    },


    remove() {
        localStorage.removeItem(
            TOKEN_KEY,
        );
    },


    getPayload() {
        const token =
            this.get();


        if (!token) {
            return null;
        }


        return decodeToken(
            token,
        );
    },


    getRole() {
        return (
            this.getPayload()
                ?.role ??
            null
        );
    },


    isValid() {
        const payload =
            this.getPayload();


        if (!payload) {
            return false;
        }


        const currentTime =
            Math.floor(
                Date.now() /
                1000,
            );


        return (
            payload.exp >
            currentTime
        );
    },


    clearIfInvalid() {
        if (
            !this.isValid()
        ) {
            this.remove();

            return false;
        }


        return true;
    },
};
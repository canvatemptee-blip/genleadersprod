export type AdminRole =
    | "admin"
    | "manager"
    | "intern";


export interface LoginRequest {
    email: string;

    password: string;
}


export interface AuthenticatedUser {
    id: number;

    name: string;

    email: string;

    role: AdminRole;
}


export interface LoginResponse {
    accessToken: string;

    user: AuthenticatedUser;
}


export interface AdminTokenPayload {
    sub: number;

    email: string;

    role: AdminRole;

    iat: number;

    exp: number;
}
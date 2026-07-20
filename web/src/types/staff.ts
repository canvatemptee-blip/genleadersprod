import type {
    AdminRole,
} from "@/types/auth";


export interface StaffAccount {
    id: number;

    name: string;

    email: string;

    role: AdminRole;

    is_active: boolean;

    last_login_at: string | null;

    created_by: number | null;

    created_at: string;

    updated_at: string;
}


export interface CreateStaffPayload {
    name: string;

    email: string;

    password: string;

    role: AdminRole;
}


export interface UpdateStaffRolePayload {
    role: AdminRole;
}


export interface UpdateStaffStatusPayload {
    is_active: boolean;
}
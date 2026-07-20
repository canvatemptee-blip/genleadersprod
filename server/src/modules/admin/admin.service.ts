import { NotFoundError } from "../../shared/errors/NotFoundError.js";

import { ValidationError } from "../../shared/errors/ValidationError.js";

import {
    passwordService,
} from "../../shared/security/PasswordService.js";

import { AdminRepository } from "./admin.repository.js";

import type {
    CreateStaffDto,
    UpdateStaffRoleDto,
    UpdateStaffStatusDto,
} from "./admin.validation.js";

export class AdminService {
    constructor(
        private readonly repository =
            new AdminRepository(),
    ) { }

    async getAdminByEmail(
        email: string,
    ) {
        const admin =
            await this.repository.findByEmail(
                email,
            );

        if (!admin) {
            throw new NotFoundError(
                "Admin",
            );
        }

        return admin;
    }

    async getAdminById(
        id: number,
    ) {
        const admin =
            await this.repository.findById(
                id,
            );

        if (!admin) {
            throw new NotFoundError(
                "Admin",
            );
        }

        return admin;
    }

    async getStaffAccounts() {
        return this.repository.findAll();
    }

    async getStaffAccount(
        id: number,
    ) {
        const staff =
            await this.repository.findById(
                id,
            );

        if (!staff) {
            throw new NotFoundError(
                "Staff account",
            );
        }

        const {
            password_hash: _,
            ...safeStaff
        } = staff;

        return safeStaff;
    }

    async createStaffAccount(
        data: CreateStaffDto,
        createdBy: number,
    ) {
        const existing =
            await this.repository.findByEmail(
                data.email,
            );

        if (existing) {
            throw new ValidationError(
                "An account with this email already exists.",
            );
        }

        const passwordHash =
            await passwordService.hash(
                data.password,
            );

        return this.repository.createStaff({
            name: data.name,
            email: data.email.toLowerCase(),
            password_hash: passwordHash,
            role: data.role,
            created_by: createdBy,
        });
    }

    async updateStaffRole(
        id: number,
        data: UpdateStaffRoleDto,
        currentAdminId: number,
    ) {
        const staff =
            await this.repository.findById(
                id,
            );

        if (!staff) {
            throw new NotFoundError(
                "Staff account",
            );
        }

        if (id === currentAdminId) {
            throw new ValidationError(
                "You cannot change your own role.",
            );
        }

        return this.repository.updateRole(
            id,
            data.role,
        );
    }

    async updateStaffStatus(
        id: number,
        data: UpdateStaffStatusDto,
        currentAdminId: number,
    ) {
        const staff =
            await this.repository.findById(
                id,
            );

        if (!staff) {
            throw new NotFoundError(
                "Staff account",
            );
        }

        if (id === currentAdminId) {
            throw new ValidationError(
                "You cannot deactivate your own account.",
            );
        }

        return this.repository.updateStatus(
            id,
            data.is_active,
        );
    }
}
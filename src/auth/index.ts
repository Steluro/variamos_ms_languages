import { SessionUser } from "@variamosple/variamos-security";

export function hasRole(user: SessionUser, role: string): boolean {
    return user.roles?.includes(role) ?? false;
}

export function hasPermission(user: SessionUser, permission: string): boolean {
    return user.permissions?.includes(permission) ?? false;
}

export function ensureRole(user: SessionUser, role: string): void {
    if (!hasRole(user, role)) {
        throw new Error(`User does not have role: ${role}`);
    }
}

export function ensurePermission(user: SessionUser, permission: string): void {
    if (!hasPermission(user, permission)) {
        throw new Error(`User does not have permission: ${permission}`);
    }
}
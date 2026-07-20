import {
  isAuthenticated as isAuthenticatedFromSecurity,
  SessionUser,
} from "@variamosple/variamos-security";
import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";

export const isAuthenticated = env.bypassAuth
  ? (req: Request, _res: Response, next: NextFunction) => {
      console.log("Bypassing authentication");
      req.user = { id: "bypass" } as SessionUser;
      next();
    }
  : isAuthenticatedFromSecurity;

export function hasRole(user: SessionUser, role: string): boolean {
  if (env.bypassAuth) {
    return true;
  }
  return user.roles?.includes(role) ?? false;
}

export function hasPermission(user: SessionUser, permission: string): boolean {
  if (env.bypassAuth) {
    return true;
  }
  return user.permissions?.includes(permission) ?? false;
}

export function ensureRole(user: SessionUser, role: string): void {
  if (env.bypassAuth) {
    return;
  }
  if (!hasRole(user, role)) {
    throw new Error(`User does not have role: ${role}`);
  }
}

export function ensurePermission(user: SessionUser, permission: string): void {
  if (env.bypassAuth) {
    return;
  }
  if (!hasPermission(user, permission)) {
    throw new Error(`User does not have permission: ${permission}`);
  }
}

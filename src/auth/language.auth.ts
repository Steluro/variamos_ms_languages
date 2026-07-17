import { SessionUser } from "@variamosple/variamos-security";
import { ensurePermission } from ".";
import Language, { Status } from "../models/language.model";

export function ensureCanRead(user: SessionUser, language: Language) {
    if (language.status === Status.PUBLISHED && language.ownerId !== user.id) {
        ensurePermission(user, "languages::get::public");
        return;
    }

    if (language.ownerId === user.id) {
        ensurePermission(user, "languages::get::own");
        return;
    }

    // TODO: Shared language case

    ensurePermission(user, "languages::get::all");
}

export function ensureCanCreate(user: SessionUser) {
    ensurePermission(user, "languages::create");
}

export function ensureCanUpdate(user: SessionUser, language: Language) {
    if (language.ownerId === user.id && language.status === Status.DRAFT) {
        ensurePermission(user, "languages::update::own");
        return;
    }

    // TODO: Shared language case

    ensurePermission(user, "languages::update::all");
}

export function ensureCanDelete(user: SessionUser, language: Language) {
    if (language.ownerId === user.id && language.status === Status.DRAFT) {
        ensurePermission(user, "languages::delete::own");
        return;
    }

    // TODO: Shared language case

    ensurePermission(user, "languages::delete::all");
}
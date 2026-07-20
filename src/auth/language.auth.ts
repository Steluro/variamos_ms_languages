import { SessionUser } from "@variamosple/variamos-security";
import { ensurePermission } from ".";
import { CollaboratorRole } from "../models/collaborator.model";
import Language, { Status } from "../models/language.model";

export function ensureCanRead(user: SessionUser, language: Language) {
  if (language.status === Status.PUBLISHED && language.ownerId !== user.id) {
    ensurePermission(user, "languages::get::public");
    return;
  }

  if (
    language.ownerId === user.id ||
    language.collaborators?.some(
      (c) =>
        c.userId === user.id &&
        [
          CollaboratorRole.VIEWER,
          CollaboratorRole.EDITOR,
          CollaboratorRole.MANAGER,
        ].includes(c.role),
    )
  ) {
    ensurePermission(user, "languages::get::own");
    return;
  }

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

  if (
    language.status === Status.DRAFT &&
    (language.ownerId === user.id ||
      language.collaborators?.some(
        (c) =>
          c.userId === user.id &&
          [CollaboratorRole.EDITOR, CollaboratorRole.MANAGER].includes(c.role),
      ))
  ) {
    ensurePermission(user, "languages::update::own");
    return;
  }

  ensurePermission(user, "languages::update::all");
}

export function ensureCanDelete(user: SessionUser, language: Language) {
  if (
    language.status === Status.DRAFT &&
    (language.ownerId === user.id ||
      language.collaborators?.some(
        (c) =>
          c.userId === user.id && [CollaboratorRole.EDITOR].includes(c.role),
      ))
  ) {
    ensurePermission(user, "languages::delete::own");
    return;
  }

  ensurePermission(user, "languages::delete::all");
}

export function ensureCanManageCollaborators(
  user: SessionUser,
  language: Language,
) {
  if (
    language.status === Status.DRAFT &&
    (language.ownerId === user.id ||
      language.collaborators?.some(
        (c) =>
          c.userId === user.id && [CollaboratorRole.EDITOR].includes(c.role),
      ))
  ) {
    ensurePermission(user, "languages::manage-collaborators::own");
    return;
  }

  ensurePermission(user, "languages::manage-collaborators::all");
}

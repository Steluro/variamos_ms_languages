import { SessionUser } from "@variamosple/variamos-security";
import {
  ensureCanManageCollaborators,
  ensureCanRead,
} from "../auth/language.auth";
import { CollaboratorRole } from "../models/collaborator.model";
import * as collaboratorRepository from "../repositories/collaborator.repository";
import * as languageRepository from "../repositories/language.repository";

export async function getLanguageCollaboratorss(
  uuid: string,
  user: SessionUser,
) {
  const language = await languageRepository.findById(uuid);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);
  return collaboratorRepository.getLanguageCollaboratorss(uuid);
}

export async function addLanguageCollaborators(
  uuid: string,
  data: {
    userId: string;
    role: CollaboratorRole;
  },
  user: SessionUser,
) {
  const language = await languageRepository.findById(uuid);
  if (!language) {
    throw new Error("Language not found");
  }
  if (data.userId === language.ownerId) {
    throw new Error("You cannot add the owner as a collaborator");
  }
  ensureCanManageCollaborators(user, language);
  return collaboratorRepository.addLanguageCollaborators(uuid, data);
}

export async function updateLanguageCollaboratorRole(
  uuid: string,
  userId: string,
  role: CollaboratorRole,
  user: SessionUser,
) {
  const language = await languageRepository.findById(uuid);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanManageCollaborators(user, language);
  return collaboratorRepository.updateLanguageCollaboratorRole(
    uuid,
    userId,
    role,
  );
}

export async function removeLanguageCollaborator(
  uuid: string,
  userId: string,
  user: SessionUser,
) {
  const language = await languageRepository.findById(uuid);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanManageCollaborators(user, language);
  return collaboratorRepository.removeLanguageCollaborator(uuid, userId);
}

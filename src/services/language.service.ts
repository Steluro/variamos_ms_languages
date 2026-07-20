import { SessionUser } from "@variamosple/variamos-security";
import {
  ensureCanCreate,
  ensureCanDelete,
  ensureCanManageCollaborators,
  ensureCanRead,
  ensureCanUpdate,
} from "../auth/language.auth";
import { CollaboratorRole } from "../models/collaborator.model";
import { Types } from "../models/language.model";
import * as languageRepository from "../repositories/language.repository";
import { LanguageQuery } from "./language.query";

export async function getLanguages(query: LanguageQuery, user: SessionUser) {
  const languages = await languageRepository.findAll(query);
  languages.forEach((language) => {
    ensureCanRead(user, language);
  });
  return languages;
}

export async function getLanguage(uuid: string, user: SessionUser) {
  const language = await languageRepository.findById(uuid);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);
  return language;
}

export async function createLanguage(
  data: {
    name: string;
    type: Types;
  },
  user: SessionUser,
) {
  ensureCanCreate(user);
  return languageRepository.create({
    ...data,
    ownerId: user.id,
  });
}

export async function updateLanguage(
  uuid: string,
  data: Partial<{
    name: string;
    type: Types;
    publicVersionId?: string;
  }>,
  user: SessionUser,
) {
  const language = await languageRepository.findById(uuid);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  return languageRepository.update(uuid, data);
}

export async function deleteLanguage(uuid: string, user: SessionUser) {
  const language = await languageRepository.findById(uuid);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanDelete(user, language);
  return languageRepository.remove(uuid);
}

export async function getLanguageCollaboratorss(
  uuid: string,
  user: SessionUser,
) {
  const language = await languageRepository.findById(uuid);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);
  return languageRepository.getLanguageCollaboratorss(uuid);
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
  ensureCanManageCollaborators(user, language);
  return languageRepository.addLanguageCollaborators(uuid, data);
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
  return languageRepository.updateLanguageCollaboratorRole(uuid, userId, role);
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
  return languageRepository.removeLanguageCollaborator(uuid, userId);
}

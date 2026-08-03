import { SessionUser } from "@variamosple/variamos-security";
import {
  ensureCanCreate,
  ensureCanDelete,
  ensureCanRead,
  ensureCanUpdate,
} from "../auth/language.auth";
import { Types } from "../models/language.model";
import { LanguageQuery } from "../repositories/language.query";
import * as languageRepository from "../repositories/language.repository";

export async function getLanguages(query: LanguageQuery, user: SessionUser) {
  const languages = await languageRepository.findAll(query);
  const filtered_languages = languages.filter((language) => {
    try {
    ensureCanRead(user, language);
      return true
    } catch {
      return false
    }
  });
  return filtered_languages;
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

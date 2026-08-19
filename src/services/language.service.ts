import { SessionUser } from "@variamosple/variamos-security";
import {
  ensureCanCreate,
  ensureCanDelete,
  ensureCanRead,
  ensureCanUpdate,
  ensureCanPublish,
  ensureCanSubmit,
  ensureCanWithdraw,
} from "../auth/language.auth";
import Language, { Types } from "../models/language.model";
import { Status } from "../models/language.model";
import { LanguageQuery } from "../repositories/language.query";
import * as languageRepository from "../repositories/language.repository";
import { Attributes } from "sequelize";

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
  data: Partial<Attributes<Language> & Omit<{ uuid: string }, "uuid">>,
  user: SessionUser,
) {
  const language = await languageRepository.findById(uuid);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  if(data.status){
    switch(language.status,data.status){
      case (Status.DRAFT,Status.PENDING):
        ensureCanSubmit(user, language);
        break;
      case (Status.PENDING,Status.PUBLISHED):
        ensureCanPublish(user, language);
        break;
      case (Status.PENDING,Status.DRAFT):
        ensureCanWithdraw(user, language);
        break;
      default:
        throw new Error("Invalid status transition");      
    }
  }
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

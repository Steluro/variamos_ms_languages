import { SessionUser } from "@variamosple/variamos-security";
import { ensureCanRead, ensureCanUpdate } from "../auth/language.auth";
import * as languageRepository from "../repositories/language.repository";
import * as reificationTypeRepository from "../repositories/reificationType.repository";
import { Attributes, CreationAttributes } from "sequelize";
import ReificationType from "../models/reificationType.model";

export async function getLanguageReificationTypes(
  languageId: string,
  user: SessionUser,
) {
  const language = await languageRepository.findById(languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);
  return reificationTypeRepository.findAllByLanguageId(languageId);
}

export async function getReificationType(uuid: string, user: SessionUser) {
  const reificationType = await reificationTypeRepository.findById(uuid);
  if (!reificationType) {
    throw new Error("Reification type not found");
  }
  const language = await languageRepository.findById(
    reificationType.languageId,
  );
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);
  return reificationType;
}

export async function createReificationType(
  data: CreationAttributes<ReificationType>,
  user: SessionUser,
) {
  const language = await languageRepository.findById(data.languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  return reificationTypeRepository.create(data);
}

export async function updateReificationType(
  uuid: string,
  data: Partial<Attributes<ReificationType>>,
  user: SessionUser,
) {
  const reificationType = await reificationTypeRepository.findById(uuid);
  if (!reificationType) {
    throw new Error("Reification type not found");
  }
  const language = await languageRepository.findById(
    reificationType.languageId,
  );
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  return reificationTypeRepository.update(uuid, data);
}

export async function deleteReificationType(uuid: string, user: SessionUser) {
  const reificationType = await reificationTypeRepository.findById(uuid);
  if (!reificationType) {
    throw new Error("Reification type not found");
  }
  const language = await languageRepository.findById(
    reificationType.languageId,
  );
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  return reificationTypeRepository.remove(uuid);
}

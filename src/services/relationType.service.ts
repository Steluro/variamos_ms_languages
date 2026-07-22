import { SessionUser } from "@variamosple/variamos-security";
import { ensureCanRead, ensureCanUpdate } from "../auth/language.auth";
import * as languageRepository from "../repositories/language.repository";
import * as relationTypeRepository from "../repositories/relationType.repository";

export async function getLanguageRelationTypes(
  languageId: string,
  user: SessionUser,
) {
  const language = await languageRepository.findById(languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);
  return relationTypeRepository.findAllByLanguageId(languageId);
}

export async function getRelationType(
  languageId: string,
  uuid: string,
  user: SessionUser,
) {
  const relationType = await relationTypeRepository.findById(uuid);
  if (!relationType) {
    throw new Error("Relation type not found");
  }
  if (relationType.languageId !== languageId) {
    throw new Error("Relation type does not belong to the specified language");
  }
  const language = await languageRepository.findById(languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);
  return relationType;
}

export async function createRelationType(
  data: {
    languageId: string;
    name: string;
    description: string;
    style?: Record<string, unknown>;
    properties?: Record<string, unknown>;
    constraint?: string;
  },
  user: SessionUser,
) {
  const language = await languageRepository.findById(data.languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  return relationTypeRepository.create(data);
}

export async function updateRelationType(
  languageId: string,
  uuid: string,
  data: Partial<{
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
  }>,
  user: SessionUser,
) {
  const relationType = await relationTypeRepository.findById(uuid);
  if (!relationType) {
    throw new Error("Relation type not found");
  }
  if (relationType.languageId !== languageId) {
    throw new Error("Relation type does not belong to the specified language");
  }
  const language = await languageRepository.findById(languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  return relationTypeRepository.update(uuid, data);
}

export async function deleteRelationType(
  languageId: string,
  uuid: string,
  user: SessionUser,
) {
  const relationType = await relationTypeRepository.findById(uuid);
  if (!relationType) {
    throw new Error("Relation type not found");
  }
  if (relationType.languageId !== languageId) {
    throw new Error("Relation type does not belong to the specified language");
  }
  const language = await languageRepository.findById(languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  return relationTypeRepository.remove(uuid);
}

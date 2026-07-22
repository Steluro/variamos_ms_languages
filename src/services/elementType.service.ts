import { SessionUser } from "@variamosple/variamos-security";
import { ensureCanRead, ensureCanUpdate } from "../auth/language.auth";
import * as elementTypeRepository from "../repositories/elementType.repository";
import * as languageRepository from "../repositories/language.repository";

export async function getLanguageElementTypes(
  languageId: string,
  user: SessionUser,
) {
  const language = await languageRepository.findById(languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);
  return elementTypeRepository.findAllByLanguageId(languageId);
}

export async function getElementType(
  languageId: string,
  uuid: string,
  user: SessionUser,
) {
  const elementType = await elementTypeRepository.findById(uuid);
  if (!elementType) {
    throw new Error("Element type not found");
  }
  if (elementType.languageId !== languageId) {
    throw new Error("Element type does not belong to the specified language");
  }
  const language = await languageRepository.findById(languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);
  return elementType;
}

export async function createElementType(
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
  return elementTypeRepository.create(data);
}

export async function updateElementType(
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
  const elementType = await elementTypeRepository.findById(uuid);
  if (!elementType) {
    throw new Error("Element type not found");
  }
  if (elementType.languageId !== languageId) {
    throw new Error("Element type does not belong to the specified language");
  }
  const language = await languageRepository.findById(languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  return elementTypeRepository.update(uuid, data);
}

export async function deleteElementType(
  languageId: string,
  uuid: string,
  user: SessionUser,
) {
  const elementType = await elementTypeRepository.findById(uuid);
  if (!elementType) {
    throw new Error("Element type not found");
  }
  if (elementType.languageId !== languageId) {
    throw new Error("Element type does not belong to the specified language");
  }
  const language = await languageRepository.findById(languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);
  return elementTypeRepository.remove(uuid);
}

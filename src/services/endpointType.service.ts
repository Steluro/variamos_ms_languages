import { SessionUser } from "@variamosple/variamos-security";
import { ensureCanRead, ensureCanUpdate } from "../auth/language.auth";
import * as endpointTypeRepository from "../repositories/endpointType.repository";
import { findById as findLanguageById } from "../repositories/language.repository";
import { findById as findRelationTypeById } from "../repositories/relationType.repository";

export async function getRelationTypeEndpointTypes(
  relationTypeId: string,
  user: SessionUser,
) {
  const relationType = await findRelationTypeById(relationTypeId);
  if (!relationType) {
    throw new Error("Relation type not found");
  }
  const language = await findLanguageById(relationType.languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);

  return endpointTypeRepository.findAllByRelationType(relationTypeId);
}

export async function getEndpointType(uuid: string, user: SessionUser) {
  const endpointType = await endpointTypeRepository.findById(uuid);
  if (!endpointType) {
    throw new Error("Endpoint type not found");
  }
  const relationType = await findRelationTypeById(endpointType.relationTypeId);
  if (!relationType) {
    throw new Error("Relation type not found");
  }
  const language = await findLanguageById(relationType.languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanRead(user, language);

  return endpointType;
}

export async function createEndpointType(
  data: {
    relationTypeId: string;
    name: string;
    arity: number;
  },
  user: SessionUser,
) {
  const relationType = await findRelationTypeById(data.relationTypeId);
  if (!relationType) {
    throw new Error("Relation type not found");
  }
  const language = await findLanguageById(relationType.languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);

  return endpointTypeRepository.create(data);
}

export async function updateEndpointType(
  uuid: string,
  data: Partial<{
    name?: string;
    arity?: number;
    style?: Record<string, any>;
  }>,
  user: SessionUser,
) {
  const endpointType = await endpointTypeRepository.findById(uuid);
  if (!endpointType) {
    throw new Error("Endpoint type not found");
  }
  const relationType = await findRelationTypeById(endpointType.relationTypeId);
  if (!relationType) {
    throw new Error("Relation type not found");
  }
  const language = await findLanguageById(relationType.languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);

  return endpointTypeRepository.update(uuid, data);
}

export async function deleteEndpointType(uuid: string, user: SessionUser) {
  const endpointType = await endpointTypeRepository.findById(uuid);
  if (!endpointType) {
    throw new Error("Endpoint type not found");
  }
  const relationType = await findRelationTypeById(endpointType.relationTypeId);
  if (!relationType) {
    throw new Error("Relation type not found");
  }
  const language = await findLanguageById(relationType.languageId);
  if (!language) {
    throw new Error("Language not found");
  }
  ensureCanUpdate(user, language);

  return endpointTypeRepository.remove(uuid);
}

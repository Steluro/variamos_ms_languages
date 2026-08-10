import { SessionUser } from "@variamosple/variamos-security";
import { ensureCanRead, ensureCanUpdate } from "../auth/language.auth";
import * as languageRepository from "../repositories/language.repository";
import * as reificationTypeRepository from "../repositories/reificationType.repository";
import * as reificationTypeEndpointRepository from "../repositories/reificationTypeEndpoint.repository";
import { Attributes, CreationAttributes } from "sequelize";
import ReificationTypeEndpoint from "../models/reificationTypeEndpoint.model";

export async function getReificationTypeEndpoints(
  reificationTypeId: string,
  user: SessionUser,
) {
  const reificationType =
    await reificationTypeRepository.findById(reificationTypeId);
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
  return reificationTypeEndpointRepository.findAllByReificationTypeId(
    reificationTypeId,
  );
}

export async function getEndpoint(uuid: string, user: SessionUser) {
  const endpoint = await reificationTypeEndpointRepository.findById(uuid);
  if (!endpoint) {
    throw new Error("Endpoint not found");
  }
  const reificationType = await reificationTypeRepository.findById(
    endpoint.reificationTypeId,
  );
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
  return endpoint;
}

export async function createEndpoint(
  data: CreationAttributes<ReificationTypeEndpoint>,
  user: SessionUser,
) {
  const reificationType = await reificationTypeRepository.findById(
    data.reificationTypeId,
  );
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
  return reificationTypeEndpointRepository.create(data);
}

export async function updateEndpoint(
  uuid: string,
  data: Partial<Attributes<ReificationTypeEndpoint>>,
  user: SessionUser,
) {
  const endpoint = await reificationTypeEndpointRepository.findById(uuid);
  if (!endpoint) {
    throw new Error("Endpoint not found");
  }
  const reificationType = await reificationTypeRepository.findById(
    endpoint.reificationTypeId,
  );
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
  return reificationTypeEndpointRepository.update(uuid, data);
}

export async function deleteEndpoint(uuid: string, user: SessionUser) {
  const reificationTypeEndpoint =
    await reificationTypeEndpointRepository.findById(uuid);
  if (!reificationTypeEndpoint) {
    throw new Error("Endpoint not found");
  }
  const reificationType = await reificationTypeRepository.findById(
    reificationTypeEndpoint.reificationTypeId,
  );
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
  return reificationTypeEndpointRepository.remove(uuid);
}

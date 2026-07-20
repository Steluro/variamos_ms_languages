import Collaborator, { CollaboratorRole } from "../models/collaborator.model";
import Language, { Status, Types } from "../models/language.model";
import UserReference from "../models/userReference.model";
import { buildQuery, LanguageQuery } from "../services/language.query";

export async function findAll(query: LanguageQuery) {
  const languages = await Language.findAll(buildQuery(query));
  return languages;
}

export async function findById(uuid: string) {
  const language = await Language.findOne(buildQuery({ uuid }));
  return language;
}

export async function create(data: {
  name: string;
  ownerId: string;
  type: Types;
  publicVersionId?: string;
}) {
  return await Language.create(data);
}

export async function update(
  uuid: string,
  data: Partial<{
    name: string;
    type: Types;
    publicVersionId?: string;
  }>,
) {
  return await Language.update(data, { where: { uuid } });
}

export async function remove(uuid: string) {
  return await Language.update({ status: Status.DELETED }, { where: { uuid } });
}

export async function getLanguageCollaboratorss(uuid: string) {
  const language = await Language.findOne({
    where: { uuid },
    include: [
      {
        model: UserReference,
        as: "collaborators",
        attributes: ["id", "name"],
        through: {
          attributes: ["role"],
        },
      },
    ],
  });
  return language?.collaborators || [];
}

export async function addLanguageCollaborators(
  uuid: string,
  data: {
    userId: string;
    role: CollaboratorRole;
  },
) {
  const language = await Language.findOne({
    where: { uuid },
  });
  if (!language) {
    throw new Error("Language not found");
  }
  return await Collaborator.create({
    languageId: language.uuid,
    userId: data.userId,
    role: data.role,
  });
}

export async function updateLanguageCollaboratorRole(
  uuid: string,
  userId: string,
  role: CollaboratorRole,
) {
  return await Collaborator.update(
    { role },
    { where: { languageId: uuid, userId } },
  );
}

export async function removeLanguageCollaborator(uuid: string, userId: string) {
  return await Collaborator.destroy({
    where: {
      languageId: uuid,
      userId,
    },
  });
}

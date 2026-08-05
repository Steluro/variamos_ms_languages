import Collaborator, { CollaboratorRole } from "../models/collaborator.model";
import Language from "../models/language.model";
import UserReference from "../models/userReference.model";

export async function getLanguageCollaboratorss(uuid: string) {
  const language = await Language.findOne({
    where: { uuid },
    include: [
      {
        model: Collaborator,
        as: "collaborators",
        attributes: ["role"],
        include: [
          {
            model: UserReference,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
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

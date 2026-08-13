import { Attributes } from "sequelize";
import RelationType from "../models/relationType.model";

export async function findAllByLanguageId(languageId: string) {
  return RelationType.findAll({
    where: {
      languageId,
    },
  });
}

export async function findById(uuid: string) {
  return RelationType.findOne({
    where: {
      uuid,
    },
  });
}

export async function create(data: { languageId: string; name: string }) {
  return RelationType.create(data);
}

export async function update(
  uuid: string,
  data: Partial<Attributes<RelationType>>,
) {
  await RelationType.update(data, {
    where: {
      uuid,
    },
  });
  const relationType = await RelationType.findByPk(uuid);
  if (!relationType) throw new Error("Relation type not found");
  if (data.sources !== undefined) relationType.setSources(data.sources);
  if (data.targets !== undefined) relationType.setTargets(data.targets);
}

export async function remove(uuid: string) {
  return RelationType.destroy({
    where: {
      uuid,
    },
  });
}

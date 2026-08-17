import { Attributes } from "sequelize";
import RelationType from "../models/relationType.model";
import ElementType from "../models/elementType.model";
export async function findAllByLanguageId(languageId: string) {
  return RelationType.findAll({
    where: {
      languageId,
    },
    include: [
      {
        model: ElementType,
        as: "sources",
        attributes: ["uuid", "name", "description"],
      },
      {
        model: ElementType,
        as: "targets",
        attributes: ["uuid", "name", "description"],
      },
    ],
  });
}

export async function findById(uuid: string) {
  return RelationType.findOne({
    where: {
      uuid,
    },
    include: [
      {
        model: ElementType,
        as: "sources",
        attributes: ["uuid", "name", "description"],
        through: { attributes: [] }, // drop RelationTypes_Sources field
      },
      {
        model: ElementType,
        as: "targets",
        attributes: ["uuid", "name", "description"],
        through: { attributes: [] }, // drop RelationTypes_Targets field
      },
    ],
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
  if (data.sources !== undefined) await relationType.setSources(data.sources);
  if (data.targets !== undefined) await relationType.setTargets(data.targets);
}

export async function remove(uuid: string) {
  return RelationType.destroy({
    where: {
      uuid,
    },
  });
}

import { Attributes, CreationAttributes } from "sequelize";
import ReificationTypeEndpoint from "../models/reificationTypeEndpoint.model";
import ElementType from "../models/elementType.model";

export async function findAllByReificationTypeId(
  reificationTypeId: string,
): Promise<ReificationTypeEndpoint[]> {
  return ReificationTypeEndpoint.findAll({
    where: {
      reificationTypeId,
    },
    include: [
      {
        model: ElementType,
        as: "elementTypes",
        attributes: ["uuid", "name", "description"],
      },
    ],
  });
}

export async function findById(
  uuid: string,
): Promise<ReificationTypeEndpoint | null> {
  return ReificationTypeEndpoint.findOne({
    where: {
      uuid,
    },
    include: [
      {
        model: ElementType,
        as: "elementTypes",
        attributes: ["uuid", "name", "description"],
      },
    ],
  });
}

export async function create(
  data: CreationAttributes<ReificationTypeEndpoint>,
): Promise<ReificationTypeEndpoint> {
  return ReificationTypeEndpoint.create(data);
}

export async function update(
  uuid: string,
  data: Partial<Attributes<ReificationTypeEndpoint>>,
): Promise<void> {
  await ReificationTypeEndpoint.update(data, {
    where: {
      uuid,
    },
  });
  const endpoint = await ReificationTypeEndpoint.findByPk(uuid);
  if (!endpoint) throw new Error("Endpoint not found");
  if (data.elementTypes !== undefined)
    endpoint.setElementTypes(data.elementTypes);
}

export async function remove(uuid: string): Promise<void> {
  ReificationTypeEndpoint.destroy({
    where: {
      uuid,
    },
  });
}

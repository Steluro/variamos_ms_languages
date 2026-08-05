import { Attributes, CreationAttributes } from "sequelize";
import ReificationTypeEndpoint from "../models/reificationTypeEndpoint.model";

export async function findAllByReificationTypeId(
  reificationTypeId: string,
): Promise<ReificationTypeEndpoint[]> {
  return ReificationTypeEndpoint.findAll({
    where: {
      reificationTypeId,
    },
  });
}

export async function findById(
  uuid: string,
): Promise<ReificationTypeEndpoint | null> {
  return ReificationTypeEndpoint.findOne({
    where: {
      uuid,
    },
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
  ReificationTypeEndpoint.update(data, {
    where: {
      uuid,
    },
  });
}

export async function remove(uuid: string): Promise<void> {
  ReificationTypeEndpoint.destroy({
    where: {
      uuid,
    },
  });
}

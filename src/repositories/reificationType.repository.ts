import { Attributes, CreationAttributes } from "sequelize";
import ReificationType from "../models/reificationType.model";

export async function findAllByLanguageId(
  languageId: string,
): Promise<ReificationType[]> {
  return ReificationType.findAll({
    where: {
      languageId,
    },
  });
}

export async function findById(uuid: string): Promise<ReificationType | null> {
  return ReificationType.findOne({
    where: {
      uuid,
    },
  });
}

export async function create(
  data: CreationAttributes<ReificationType>,
): Promise<ReificationType> {
  return ReificationType.create(data);
}

export async function update(
  uuid: string,
  data: Partial<Attributes<ReificationType>>,
): Promise<void> {
  ReificationType.update(data, {
    where: {
      uuid,
    },
  });
}

export async function remove(uuid: string): Promise<void> {
  ReificationType.destroy({
    where: {
      uuid,
    },
  });
}

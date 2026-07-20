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
  data: Partial<{
    name: string;
    description: string;
    style: Record<string, unknown>;
    constraint: string;
  }>,
) {
  return RelationType.update(data, {
    where: {
      uuid,
    },
  });
}

export async function remove(uuid: string) {
  return RelationType.destroy({
    where: {
      uuid,
    },
  });
}

import ElementType from "../models/elementType.model";

export async function findAllByLanguageId(languageId: string) {
  return ElementType.findAll({
    where: {
      languageId,
    },
  });
}

export async function findById(uuid: string) {
  return ElementType.findOne({
    where: {
      uuid,
    },
  });
}

export async function create(data: { languageId: string; name: string }) {
  return ElementType.create(data);
}

export async function update(
  uuid: string,
  data: Partial<{
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
  }>,
) {
  return ElementType.update(data, {
    where: {
      uuid,
    },
  });
}

export async function remove(uuid: string) {
  return ElementType.destroy({
    where: {
      uuid,
    },
  });
}

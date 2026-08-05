import Language, { Status, Types } from "../models/language.model";
import { buildQuery, LanguageQuery } from "./language.query";

export function findAll(query: LanguageQuery) {
  return Language.findAll(buildQuery(query));
}

export function findById(uuid: string) {
  return Language.findOne(buildQuery({ uuid }));
}

export function create(data: {
  name: string;
  ownerId: string;
  type: Types;
  publicVersionId?: string;
}) {
  return Language.create(data);
}

export function update(
  uuid: string,
  data: Partial<{
    name: string;
    type: Types;
    publicVersionId?: string;
  }>,
) {
  return Language.update(data, { where: { uuid } });
}

export function remove(uuid: string) {
  return Language.update({ status: Status.DELETED }, { where: { uuid } });
}

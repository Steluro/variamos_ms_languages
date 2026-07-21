import { FindOptions } from "sequelize";
import Language from "../models/language.model";
import UserReference from "../models/userReference.model";
import { buildFilter, LanguageFilter } from "./language.filter";

export interface LanguageQuery extends LanguageFilter {
  page?: number;
  pageSize?: number;
  sortBy?: keyof Language;
  sortOrder?: "ASC" | "DESC";
}

const builders: ((
  q: LanguageQuery,
) => Partial<FindOptions<Language>> | undefined)[] = [
  (_q) => ({
    include: [
      {
        model: UserReference,
        as: "owner",
        attributes: ["id", "name"],
      },
      {
        model: Language,
        as: "publicVersion",
        attributes: ["uuid", "name"],
      },
    ],
  }),

  (q) =>
    q
      ? {
          where: buildFilter(q),
        }
      : undefined,

  (q) =>
    q.page !== undefined && q.pageSize !== undefined
      ? {
          offset: (Math.max(q.page, 1) - 1) * q.pageSize,
          limit: q.pageSize,
        }
      : undefined,

  (q) =>
    q.sortBy
      ? {
          order: [[q.sortBy, q.sortOrder || "ASC"]],
        }
      : undefined,
];

export function buildQuery(query: LanguageQuery): FindOptions<Language> {
  return builders.reduce(
    (options, builder) => Object.assign(options, builder(query)),
    {} as FindOptions<Language>,
  );
}

import { FindOptions } from "sequelize";
import UserReference from "../userReferences/userReference.model";
import { buildFilter, LanguageFilter } from "./language.filter";
import { LanguageAttributes } from "./language.model";
import LanguageCollaborator from "./languageCollaborator.model";

export interface LanguageQuery extends LanguageFilter {
    page?: number;
    pageSize?: number;
    sortBy?: keyof LanguageAttributes;
    sortOrder?: 'ASC' | 'DESC';
}

const builders: ((q: LanguageQuery) => Partial<FindOptions<LanguageAttributes>> | undefined)[] = [
    (_q) => {
        return {
            include: [
                {
                    model: UserReference,
                    as: "owner",
                    attributes: ["id", "name"],
                },
                {
                    model: LanguageCollaborator,
                    as: "collaborators",
                    attributes: ["role"],
                    include: [
                        {
                            model: UserReference,
                            as: "user",
                            attributes: ["id", "name"],
                        },
                    ],
                },
            ],
        };
    },

    (q) => q ? {
        where: buildFilter(q),
    } : undefined,

    (q) => q.page !== undefined && q.pageSize !== undefined ? {
        offset: (Math.max(q.page, 1) - 1) * q.pageSize,
        limit: q.pageSize,
    } : undefined,

    (q) => q.sortBy ? {
        order: [[q.sortBy, q.sortOrder || 'ASC']],
    } : undefined,
];

export function buildQuery(query: LanguageQuery): FindOptions<LanguageAttributes> {
    return builders.reduce(
        (options, builder) => Object.assign(options, builder(query)),
        {} as FindOptions<LanguageAttributes>
    );
}
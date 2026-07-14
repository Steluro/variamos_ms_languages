import { Op, WhereOptions } from "sequelize";

export interface LanguageFilters {
    where: WhereOptions;
    ownerWhere: WhereOptions;
    limit?: number;
    offset?: number;
}

export function buildLanguageFilters(
    query: Record<string, unknown>,
): LanguageFilters {
    const where: WhereOptions = {};
    const ownerWhere: WhereOptions = {};

    const {
        name,
        ownerId,
        ownerName,
        type,
        isPending,
        isDeleted,
        createdBefore,
        createdAfter,
        updatedBefore,
        updatedAfter,
        limit,
        offset,
    } = query;

    if (typeof name === "string") {
        where.name = {
            [Op.iLike]: `%${name}%`,
        };
    }

    if (typeof ownerId === "string") {
        where.ownerId = ownerId;
    }

    if (typeof type === "string") {
        where.type = type;
    }

    if (typeof isPending === "string") {
        where.isPending = isPending === "true";
    }

    if (typeof isDeleted === "string") {
        where.isDeleted = isDeleted === "true";
    }

    if (typeof ownerName === "string") {
        ownerWhere.name = {
            [Op.iLike]: `%${ownerName}%`,
        };
    }

    if (typeof createdBefore === "string" || typeof createdAfter === "string") {
        where.createdAt = {};

        if (typeof createdBefore === "string") {
            where.createdAt[Op.lt] = createdBefore;
        }

        if (typeof createdAfter === "string") {
            where.createdAt[Op.gt] = createdAfter;
        }
    }

    if (typeof updatedBefore === "string" || typeof updatedAfter === "string") {
        where.updatedAt = {};

        if (typeof updatedBefore === "string") {
            where.updatedAt[Op.lt] = updatedBefore;
        }

        if (typeof updatedAfter === "string") {
            where.updatedAt[Op.gt] = updatedAfter;
        }
    }

    return {
        where,
        ownerWhere,
        limit: typeof limit === "string" ? Number.parseInt(limit) : undefined,
        offset: typeof offset === "string" ? Number.parseInt(offset) : undefined,
    };
}
import UserReference from "../userReferences/userReference.model";
import { LanguageFilters } from "./language.filters";
import Language from "./language.model";

export async function findAll(filters: LanguageFilters) {

    return Language.findAll({
        where: filters.where,
        include: [
            {
                model: UserReference,
                as: "owner",
                attributes: ["id", "name"],
                where: filters.ownerWhere,
            },
        ],
        limit: filters.limit,
        offset: filters.offset,
    });
}

export async function findById(uuid: string) {
    return Language.findOne({
        where: {
            uuid,
        },
        include: [
            {
                model: UserReference,
                as: "owner",
                attributes: ["id", "name"],
            },
        ],
    });
}

export async function create(data: {
    name: string;
    type: "scope" | "domain" | "application";
    publicVersionId?: string;
}) {
    return await Language.create({
        ...data,
        status: "draft",
        // TODO: Get from auth context
        ownerId: "00000000-0000-0000-0000-000000000000",
    });
}

export async function update(uuid: string, data: Partial<{
    name: string;
    type: "scope" | "domain" | "application";
    publicVersionId?: string;
    status?: "draft" | "pending" | "published" | "deleted";
}>) {
    return await Language.update(data, { where: { uuid } });
}

export async function remove(uuid: string) {
    return await Language.destroy({ where: { uuid } });
}
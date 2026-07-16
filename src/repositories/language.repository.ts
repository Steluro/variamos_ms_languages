import Language from "../models/language.model";
import { buildQuery, LanguageQuery } from "../utils/language.query";

export async function findAll(query: LanguageQuery) {
    return Language.findAll(buildQuery(query));
}

export async function findById(uuid: string) {
    return Language.findOne(buildQuery({ uuid }));
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

/**
 * Soft delete a language by setting its status to "deleted"
 * @param uuid The UUID of the language to delete
 * @returns The number of affected rows
 */
export async function remove(uuid: string) {
    return await Language.update({ status: "deleted" }, { where: { uuid } });
}
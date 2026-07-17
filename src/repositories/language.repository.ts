import Language, { Status, Types } from "../models/language.model";
import { buildQuery, LanguageQuery } from "../utils/language.query";

export async function findAll(query: LanguageQuery) {
    const languages = await Language.findAll(buildQuery(query));
    return languages;
}

export async function findById(uuid: string) {
    const language = await Language.findOne(buildQuery({ uuid }));
    return language;
}

export async function create(data: {
    name: string;
    type: Types;
    publicVersionId?: string;
}) {
    return await Language.create({
        ...data,
        // TODO: Get from auth context
        ownerId: "00000000-0000-0000-0000-000000000000",
    });
}

export async function update(uuid: string, data: Partial<{
    name: string;
    type: Types;
    status?: Status;
    publicVersionId?: string;
}>) {
    return await Language.update(data, { where: { uuid } });
}

/**
 * Soft delete a language by setting its status to "deleted"
 * @param uuid The UUID of the language to delete
 * @returns The number of affected rows
 */
export async function remove(uuid: string) {
    return await update(uuid, { status: Status.DELETED });
}
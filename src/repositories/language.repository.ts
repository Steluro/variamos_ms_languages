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
    ownerId: string;
    type: Types;
    publicVersionId?: string;
}) {
    return await Language.create(data);
}

export async function update(uuid: string, data: Partial<{
    name: string;
    type: Types;
    publicVersionId?: string;
}>) {
    return await Language.update(data, { where: { uuid } });
}

export async function remove(uuid: string) {
    return await Language.update({ status: Status.DELETED }, { where: { uuid } });
}
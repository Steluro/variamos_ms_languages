import { Op, WhereOptions } from "sequelize";
import { LanguageAttributes } from "./language.model";

export interface LanguageFilter {
    uuid?: string | string[];
    name?: string;
    type?: string | string[];
    status?: string | string[];
    createdAtFrom?: Date | string;
    createdAtTo?: Date | string;
    updatedAtFrom?: Date | string;
    updatedAtTo?: Date | string;
    ownerId?: string | string[];
    ownerName?: string;
}

const builders: ((f: LanguageFilter) => Partial<WhereOptions> | undefined)[] = [
    (f) => f.uuid ? {
        uuid: { [Op.in]: Array.isArray(f.uuid) ? f.uuid : f.uuid.split(",").map((id) => id.trim()) },
    } : undefined,

    (f) => f.name ? {
        name: { [Op.like]: `%${f.name}%` },
    } : undefined,

    (f) => f.type ? {
        type: { [Op.in]: Array.isArray(f.type) ? f.type : f.type.split(",").map((type) => type.trim()) },
    } : undefined,

    (f) => f.status ? {
        status: { [Op.in]: Array.isArray(f.status) ? f.status : f.status.split(",").map((status) => status.trim()) },
    } : undefined,

    (f) => f.createdAtFrom || f.createdAtTo ? {
        createdAt: {
            ...(f.createdAtFrom && { [Op.gte]: f.createdAtFrom }),
            ...(f.createdAtTo && { [Op.lte]: f.createdAtTo }),
        },
    } : undefined,

    (f) => f.updatedAtFrom || f.updatedAtTo ? {
        updatedAt: {
            ...(f.updatedAtFrom && { [Op.gte]: f.updatedAtFrom }),
            ...(f.updatedAtTo && { [Op.lte]: f.updatedAtTo }),
        },
    } : undefined,

    (f) => f.ownerId ? {
        ownerId: { [Op.in]: Array.isArray(f.ownerId) ? f.ownerId : f.ownerId.split(",").map((id) => id.trim()) },
    } : undefined,

    (f) => f.ownerName ? {
        '$owner.name$': { [Op.like]: `%${f.ownerName}%` },
    } : undefined,
];

export function buildFilter(filter: LanguageFilter): WhereOptions<LanguageAttributes> {
    return builders.reduce(
        (where, builder) => Object.assign(where, builder(filter)),
        {} as WhereOptions<LanguageAttributes>
    );
}
import { Op, WhereOptions } from "sequelize";
import { LanguageAttributes } from "../models/language.model";

export interface LanguageFilter {
    uuid?: string | string[];
    name?: string | string[];
    type?: string | string[];
    status?: string | string[];
    createdBefore?: Date | string;
    createdAfter?: Date | string;
    updatedBefore?: Date | string;
    updatedAfter?: Date | string;
    ownerId?: string | string[];
    ownerName?: string | string[];
}

const builders: ((f: LanguageFilter) => Partial<WhereOptions> | undefined)[] = [
    (f) => f.uuid ? {
        uuid: { [Op.in]: Array.isArray(f.uuid) ? f.uuid : f.uuid.split(",").map((id) => id.trim()) },
    } : undefined,

    (f) => f.name ? {
        [Op.or]: (Array.isArray(f.name) ? f.name : [f.name]).map((name) => ({
            name: {
                [Op.like]: `%${name.trim()}%`,
            },
        })),
    } : undefined,

    (f) => f.type ? {
        type: { [Op.in]: Array.isArray(f.type) ? f.type : f.type.split(",").map((type) => type.trim()) },
    } : undefined,

    (f) => f.status ? {
        status: { [Op.in]: Array.isArray(f.status) ? f.status : f.status.split(",").map((status) => status.trim()) },
    } : undefined,

    (f) => f.createdBefore || f.createdAfter ? {
        createdAt: {
            ...(f.createdBefore && { [Op.gte]: f.createdBefore }),
            ...(f.createdAfter && { [Op.lte]: f.createdAfter }),
        },
    } : undefined,

    (f) => f.updatedBefore || f.updatedAfter ? {
        updatedAt: {
            ...(f.updatedBefore && { [Op.gte]: f.updatedBefore }),
            ...(f.updatedAfter && { [Op.lte]: f.updatedAfter }),
        },
    } : undefined,

    (f) => f.ownerId ? {
        ownerId: { [Op.in]: Array.isArray(f.ownerId) ? f.ownerId : f.ownerId.split(",").map((id) => id.trim()) },
    } : undefined,

    (f) => f.ownerName ? {
        [Op.or]: (Array.isArray(f.ownerName) ? f.ownerName : f.ownerName.split(",")).map((name) => ({
            '$owner.name$': { [Op.iLike]: `%${name.trim()}%` },
        }))
    } : undefined,
];

export function buildFilter(filter: LanguageFilter): WhereOptions<LanguageAttributes> {
    return builders.reduce(
        (where, builder) => Object.assign(where, builder(filter)),
        {} as WhereOptions<LanguageAttributes>
    );
}
import { Op, WhereOptions } from "sequelize";
import { LanguageAttributes } from "./language.model";

export interface LanguageFilter {
    uuid?: string | string[];
    name?: string | string[];
    type?: string | string[];
    status?: string | string[];
    createdAtFrom?: Date | string;
    createdAtTo?: Date | string;
    updatedAtFrom?: Date | string;
    updatedAtTo?: Date | string;
    ownerId?: string | string[];
    ownerName?: string | string[];
    collaboratorId?: string | string[];
    collaboratorName?: string | string[];
    collaboratorRole?: string | string[];
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
        [Op.or]: (Array.isArray(f.ownerName) ? f.ownerName : f.ownerName.split(",")).map((name) => ({
            '$owner.name$': { [Op.iLike]: `%${name.trim()}%` },
        }))
    } : undefined,

    (f) => f.collaboratorId ? {
        '$collaborators.user.id$': { [Op.in]: Array.isArray(f.collaboratorId) ? f.collaboratorId : f.collaboratorId.split(",").map((id) => id.trim()) },
    } : undefined,

    (f) => f.collaboratorName ? {
        [Op.or]: (Array.isArray(f.collaboratorName) ? f.collaboratorName : f.collaboratorName.split(",")).map((name) => ({
            '$collaborators.user.name$': { [Op.iLike]: `%${name.trim()}%` },
        }))
    } : undefined,

    (f) => f.collaboratorRole ? {
        '$collaborators.role$': { [Op.in]: Array.isArray(f.collaboratorRole) ? f.collaboratorRole : f.collaboratorRole.split(",").map((role) => role.trim()) },
    } : undefined,
];

export function buildFilter(filter: LanguageFilter): WhereOptions<LanguageAttributes> {
    return builders.reduce(
        (where, builder) => Object.assign(where, builder(filter)),
        {} as WhereOptions<LanguageAttributes>
    );
}
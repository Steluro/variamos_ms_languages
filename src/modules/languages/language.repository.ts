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
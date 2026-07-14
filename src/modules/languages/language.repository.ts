import UserReference from "../userReferences/userReference.model";
import Language from "./language.model";
import { LanguageFilters } from "./languages.filters";


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
import UserReference from "../userReferences/userReference.model";
import Language from "./language.model";


export async function findAll() {
    return Language.findAll({
        include: [
            {
                model: UserReference,
                as: "owner",
                attributes: [
                    "id",
                    "name",
                ],
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
                attributes: [
                    "id",
                    "name",
                ],
            },
        ],
    });
}


export async function findByType(
    type: "scope" | "domain" | "application"
) {
    return Language.findAll({
        where: {
            type,
        },
    });
}
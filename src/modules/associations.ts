import UserReference from "../modules/userReferences/userReference.model";
import Language from "./languages/language.model";
import LanguageCollaborator from "./languages/languageCollaborator.model";

Language.hasMany(Language, {
    foreignKey: "publicVersionId",
    sourceKey: "uuid",
    as: "drafts"
});

Language.belongsTo(Language, {
    foreignKey: "publicVersionId",
    targetKey: "uuid",
    as: "publicVersion",
});

Language.belongsTo(UserReference, {
    foreignKey: "ownerId",
    targetKey: "id",
    as: "owner",
});

Language.hasMany(LanguageCollaborator, {
    foreignKey: "languageId",
    sourceKey: "uuid",
    as: "collaborators",
});

LanguageCollaborator.belongsTo(Language, {
    foreignKey: "languageId",
    targetKey: "uuid",
    as: "language",
});

LanguageCollaborator.belongsTo(UserReference, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});



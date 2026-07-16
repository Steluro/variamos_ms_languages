import Collaborator from "./collaborator.model";
import Language from "./language.model";
import UserReference from "./userReference.model";

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

Language.hasMany(Collaborator, {
    foreignKey: "languageId",
    sourceKey: "uuid",
    as: "collaborators",
});

Collaborator.belongsTo(Language, {
    foreignKey: "languageId",
    targetKey: "uuid",
    as: "language",
});

Collaborator.belongsTo(UserReference, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});



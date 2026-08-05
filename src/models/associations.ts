import Collaborator from "./collaborator.model";
import ElementType from "./elementType.model";
import Language from "./language.model";
import ReificationType from "./reificationType.model";
import ReificationTypeEndpoint from "./reificationTypeEndpoint.model";
import RelationType from "./relationType.model";
import UserReference from "./userReference.model";

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

Collaborator.belongsTo(UserReference, {
  foreignKey: "userId",
  targetKey: "id",
  as: "user",
});

Language.hasMany(ElementType, {
  foreignKey: "languageId",
  sourceKey: "uuid",
  as: "elementTypes",
});

Language.hasMany(RelationType, {
  foreignKey: "languageId",
  sourceKey: "uuid",
  as: "relationTypes",
});

RelationType.belongsToMany(ElementType, {
  through: "RelationTypes_Sources",
  foreignKey: "relationTypeId",
  otherKey: "elementTypeId",
  as: "sources",
});

RelationType.belongsToMany(ElementType, {
  through: "RelationTypes_Targets",
  foreignKey: "relationTypeId",
  otherKey: "elementTypeId",
  as: "targets",
});

Language.hasMany(ReificationType, {
  foreignKey: "languageId",
  sourceKey: "uuid",
  as: "reificationTypes",
});

ReificationType.hasMany(ReificationTypeEndpoint, {
  foreignKey: "reificationTypeId",
  sourceKey: "uuid",
  as: "endpoints",
});

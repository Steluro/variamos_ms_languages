import Collaborator from "./collaborator.model";
import ElementType from "./elementType.model";
import EndpointType from "./endpointType.model";
import Language from "./language.model";
import RelationType from "./relationType.model";
import UserReference from "./userReference.model";

Language.hasMany(Language, {
  foreignKey: "publicVersionId",
  sourceKey: "uuid",
  as: "drafts",
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

ElementType.belongsTo(Language, {
  foreignKey: "languageId",
  targetKey: "uuid",
  as: "language",
});

RelationType.belongsTo(Language, {
  foreignKey: "languageId",
  targetKey: "uuid",
  as: "language",
});

RelationType.hasMany(EndpointType, {
  foreignKey: "relationTypeId",
  sourceKey: "uuid",
  as: "endpointTypes",
});

EndpointType.belongsTo(RelationType, {
  foreignKey: "relationTypeId",
  targetKey: "uuid",
  as: "relationType",
});

ElementType.belongsToMany(EndpointType, {
  foreignKey: "elementTypeId",
  otherKey: "endpointTypeId",
  as: "elementType",
  through: "EndpointTypes__ElementTypes",
});

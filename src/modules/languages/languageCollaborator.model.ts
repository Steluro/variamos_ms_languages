import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { env } from "../../config/env";
import UserReference from "../userReferences/userReference.model";
import Language from "./language.model";

const LanguageCollaborator = sequelize.define("LanguageCollaborator", {
    languageId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: "Languages",
            key: "uuid",
        },
    },
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: "UserReferences",
            key: "id",
        },
    },
    role: {
        type: DataTypes.ENUM("manager", "editor", "viewer"),
        defaultValue: "viewer",
    },
}, {
    schema: env.database.schema,
    tableName: "LanguageCollaborators",
    timestamps: true,
});

Language.belongsToMany(UserReference, {
    foreignKey: "languageId",
    otherKey: "userId",
    through: LanguageCollaborator,
    as: "collaborators",
});

UserReference.belongsToMany(Language, {
    foreignKey: "userId",
    otherKey: "languageId",
    through: LanguageCollaborator,
    as: "languages",
});

export default LanguageCollaborator;
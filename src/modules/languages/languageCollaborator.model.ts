import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { env } from "../../config/env";

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

export default LanguageCollaborator;
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { env } from "../config/env";

export interface LanguageAttributes {
    uuid: string;
    name: string;
    ownerId: string;
    type: "scope" | "domain" | "application";
    status: "draft" | "pending" | "published" | "deleted";
    publicVersionId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const Language = sequelize.define("Language", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    ownerId: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.ENUM("scope", "domain", "application"),
    },
    status: {
        type: DataTypes.ENUM("draft", "pending", "published", "deleted"),
        defaultValue: "draft",
    },
    publicVersionId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    schema: env.database.schema,
    tableName: "Languages",
    timestamps: true,
});

export default Language;
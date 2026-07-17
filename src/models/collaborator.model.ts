import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import { sequelize } from "../config/database";
import { env } from "../config/env";
import Language from "./language.model";
import UserReference from "./userReference.model";

export default class Collaborator extends Model<
    InferAttributes<Collaborator, {
        omit: "createdAt" | "updatedAt";
    }>,
    InferCreationAttributes<Collaborator, {
        omit: "createdAt" | "updatedAt";
    }>
> {
    declare languageId: string;
    declare userId: string;
    declare role: CreationOptional<"manager" | "editor" | "viewer">;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

Collaborator.init(
    {
        languageId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
                model: Language,
                key: Language.primaryKeyAttribute,
            },
        },
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            references: {
                model: UserReference,
                key: UserReference.primaryKeyAttribute,
            },
        },
        role: {
            type: DataTypes.ENUM("manager", "editor", "viewer"),
            allowNull: false,
            defaultValue: "viewer",
        },
    },
    {
        sequelize,
        schema: env.database.schema,
        tableName: "Collaborators",
        timestamps: true,
    }
);
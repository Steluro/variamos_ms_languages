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

export default class RelationType extends Model<
  InferAttributes<
    RelationType,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<
    RelationType,
    {
      omit: "createdAt" | "updatedAt";
    }
  >
> {
  declare languageId: string;
  declare uuid: CreationOptional<string>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare properties: CreationOptional<Record<string, unknown>>;
  declare constraint: CreationOptional<string>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

RelationType.init(
  {
    languageId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Language,
        key: Language.primaryKeyAttribute,
      },
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    properties: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    constraint: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
    schema: env.database.schema,
    tableName: "RelationTypes",
    timestamps: true,
  },
);

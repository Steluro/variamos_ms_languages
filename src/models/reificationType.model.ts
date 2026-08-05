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
import ReificationTypeEndpoint from "./reificationTypeEndpoint.model";

export default class ReificationType extends Model<
  InferAttributes<
    ReificationType,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<
    ReificationType,
    {
      omit: "createdAt" | "updatedAt";
    }
  >
> {
  declare readonly languageId: string;
  declare readonly uuid: CreationOptional<string>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare style: CreationOptional<Record<string, unknown>>;
  declare properties: CreationOptional<Record<string, unknown>>;
  declare constraint: CreationOptional<string>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare endpoints?: ReificationTypeEndpoint[];
}

ReificationType.init(
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
    style: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        shape: "circle",
        fill: {
          type: "solid",
          value: "#ffffff",
        },
        stroke: {
          type: "solid",
          value: "#000000",
          width: 1,
        },
        font: {
          size: 12,
          color: "#000000",
        },
      },
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
    tableName: "ReificationTypes",
    timestamps: true,
  },
);

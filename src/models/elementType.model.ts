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

export class ElementType extends Model<
  InferAttributes<
    ElementType,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<
    ElementType,
    {
      omit: "createdAt" | "updatedAt";
    }
  >
> {
  declare languageId: string;
  declare uuid: CreationOptional<string>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare style: CreationOptional<Record<string, unknown>>;
  declare constraint: CreationOptional<string>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

ElementType.init(
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
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    constraint: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
    schema: env.database.schema,
    tableName: "ElementTypes",
    timestamps: true,
  },
);

export default ElementType;

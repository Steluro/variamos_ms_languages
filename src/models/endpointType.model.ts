import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import { env } from "../config/env";
import RelationType from "./relationType.model";

export default class EndpointType extends Model<
  InferAttributes<
    EndpointType,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<
    EndpointType,
    {
      omit: "createdAt" | "updatedAt";
    }
  >
> {
  declare uuid: CreationOptional<string>;
  declare relationTypeId: string;
  declare name: string;
  declare arity: number;
  declare style: CreationOptional<Record<string, unknown>>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

EndpointType.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    relationTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: RelationType,
        key: RelationType.primaryKeyAttribute,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    style: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        stroke: {
          type: "solid",
          color: "#000000",
          width: 2,
        },
        elementArrow: {
          type: "none",
        },
        relationArrow: {
          type: "none",
        },
      },
    },
  },
  {
    sequelize,
    schema: env.database.schema,
    tableName: "EndpointTypes",
    timestamps: true,
  },
);

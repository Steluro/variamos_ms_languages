import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import { env } from "../config/env";
import ElementType from "./elementType.model";
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
  declare relationTypeId: string;
  declare elementTypeId: string;
  declare name: string;
  declare style: CreationOptional<Record<string, unknown>>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

EndpointType.init(
  {
    relationTypeId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: RelationType,
        key: RelationType.primaryKeyAttribute,
      },
    },
    elementTypeId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: ElementType,
        key: ElementType.primaryKeyAttribute,
      },
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
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

import {
  BelongsToManySetAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import { env } from "../config/env";
import ReificationType from "./reificationType.model";
import ElementType from "./elementType.model";

export default class ReificationTypeEndpoint extends Model<
  InferAttributes<
    ReificationTypeEndpoint,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<
    ReificationTypeEndpoint,
    {
      omit: "createdAt" | "updatedAt";
    }
  >
> {
  declare readonly uuid: CreationOptional<string>;
  declare readonly reificationTypeId: string;
  declare name: string;
  declare arity: number; // '-1' means infinite
  declare style: CreationOptional<Record<string, unknown>>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare elementTypes?: ElementType[];
  declare setElementTypes: BelongsToManySetAssociationsMixin<
    ElementType,
    string
  >;
}

ReificationTypeEndpoint.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    reificationTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ReificationType,
        key: ReificationType.primaryKeyAttribute,
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
      defaultValue: sequelize.literal('DEFAULT'),
    },
  },
  {
    sequelize,
    schema: env.database.schema,
    tableName: "ReificationTypeEndpoints",
    timestamps: true,
  },
);

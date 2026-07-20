import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import { env } from "../config/env";
import Collaborator from "./collaborator.model";
import UserReference from "./userReference.model";

export enum Types {
  SCOPE = "scope",
  DOMAIN = "domain",
  APPLICATION = "application",
}

export enum Status {
  DRAFT = "draft",
  PENDING = "pending",
  PUBLISHED = "published",
  DELETED = "deleted",
}

export default class Language extends Model<
  InferAttributes<
    Language,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<
    Language,
    {
      omit: "createdAt" | "updatedAt";
    }
  >
> {
  declare uuid: CreationOptional<string>;
  declare name: string;
  declare ownerId: string;
  declare type: Types;
  declare status: CreationOptional<Status>;
  declare publicVersionId: CreationOptional<string | null>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare collaborators?: Collaborator[];
}

Language.init(
  {
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
      references: {
        model: UserReference,
        key: UserReference.primaryKeyAttribute,
      },
    },
    type: {
      type: DataTypes.ENUM(...Object.values(Types)),
    },
    status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      defaultValue: Status.DRAFT,
    },
    publicVersionId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Language,
        key: Language.primaryKeyAttribute,
      },
    },
  },
  {
    sequelize,
    schema: env.database.schema,
    tableName: "Languages",
    timestamps: true,
  },
);

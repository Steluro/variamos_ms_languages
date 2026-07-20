import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";

export default class UserReference extends Model<
  InferAttributes<UserReference>,
  InferCreationAttributes<UserReference>
> {
  declare id: CreationOptional<string>;
  declare name: string;
}

UserReference.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    schema: "variamos",
    tableName: "user",
    timestamps: true,
  },
);

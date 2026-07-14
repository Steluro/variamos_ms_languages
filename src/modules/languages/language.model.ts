import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { env } from "../../config/env";
import UserReference from "../userReferences/userReference.model";

const Language = sequelize.define("Language", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("scope", "domain", "application"),
        allowNull: false,
    },
    isPending: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, {
    schema: env.database.schema,
    tableName: "Languages",
    timestamps: true,
});

Language.belongsTo(UserReference, {
    foreignKey: "ownerId",
    targetKey: "id",
    as: "owner"
});

export default Language;
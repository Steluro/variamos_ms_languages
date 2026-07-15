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
    },
    ownerId: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.ENUM("scope", "domain", "application"),
    },
    status: {
        type: DataTypes.ENUM("draft", "pending", "published", "deleted"),
        defaultValue: "draft",
    },
    publicVersionId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    schema: env.database.schema,
    tableName: "Languages",
    timestamps: true,
});

Language.hasMany(Language, {
    foreignKey: "publicVersionId",
    sourceKey: "uuid",
    as: "drafts"
});

Language.belongsTo(Language, {
    foreignKey: "publicVersionId",
    targetKey: "uuid",
    as: "publicVersion",
});

Language.belongsTo(UserReference, {
    foreignKey: "ownerId",
    targetKey: "id",
    as: "owner",
});

export default Language;
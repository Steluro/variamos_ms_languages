import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database';

/**
 * TODO: Replace this model with an actual user reference with event sourcing
 */
const UserReference = sequelize.define(
    'UserReference',
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
        schema: "variamos",
        tableName: 'user',
        timestamps: true,
    }
);

export default UserReference;
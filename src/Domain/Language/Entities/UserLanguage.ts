// import Sequelize, { JSON, JSONB } from "sequelize";
// import variamos_db from "../../../DataProviders/dataBase/variamos";

import Sequelize, { Model } from "sequelize";
import sequelize from "../../../DataProviders/dataBase/VariamosORM";
import { OrmUser } from "../../Session/Entities/User";
import { OrmLanguage } from "./Language";

export interface UserLanguageAttributes{
  user_id?: string;
  language_id?: number;
  access_level?: string;
}

export class OrmUserLanguage extends Model<UserLanguageAttributes> implements UserLanguageAttributes{
  user_id?: string;
  language_id?: number;
  access_level?: string;
}
OrmUserLanguage.init(
  {
    user_id: {
      type: Sequelize.TEXT, 
      primaryKey: true,
      references:{
        model : OrmUser,
        key: "id"
      } 
    },
    language_id: {
      type: Sequelize.INTEGER, 
      primaryKey: true,
      references:{
        model : OrmLanguage,
        key: "id"
      }
    },
    access_level: {
      type: Sequelize.CHAR(10)
    } 
  },
  {
    tableName :"user_language",
    sequelize,
    freezeTableName: true,
    schema: "variamos",
    timestamps: false,
  }
);

OrmUserLanguage.belongsTo(OrmUser, {
  foreignKey: "user_id",
  as: "user",
});

OrmUser.hasMany(OrmUserLanguage, {
  foreignKey: "user_id",
  as: "userLanguages",
});

OrmUserLanguage.belongsTo(OrmLanguage, {
  foreignKey: "language_id",
  as: "language",
});

OrmLanguage.hasMany(OrmUserLanguage, {
  foreignKey: "language_id",
  as: "userLanguages",
});

OrmLanguage.hasMany(OrmUserLanguage, {
  foreignKey: "language_id",
  as: "owner",
});

OrmLanguage.hasMany(OrmUserLanguage, {
  foreignKey: "language_id",
  as: "userPermission",
});

export class UserLanguage {
  user_id?: string;
  language_id?: number; 
  access_level?: string;
  [key: string | symbol]: any;
  constructor(
    user_id?: string,
    language_id?: number,
    access_level?: string
  ) {
    this.user_id = user_id;
    this.language_id = language_id;
    this.access_level = access_level; 
  }
}

export const UserLanguageSchema = {
  type: "object",
  properties: {
    user_id: { type: "string" },
    language_id: { type: "string" },
    access_level: { type: "string" }
  },
  required: ["user_id", "language_id"],
  additionalProperties: false,
}; 


export function SearchUserPermissions(userId:string){
  let query = "SELECT v.* from variamos.sp_view_permissions_by_user('" + userId + "') v"
  return sequelize.query(query);
}

export function SearchSharedUsersByLanguage(languageId: number){
  let query = `
    SELECT u.id, u.user, u.name, u.email
    FROM variamos.user u
    INNER JOIN variamos.user_language ul ON u.id = ul.user_id
    WHERE (ul.language_id = ${languageId} AND ul.access_level = 'SHARED')
  `;
  return sequelize.query(query);
}
import { RequestModel } from "../../../Domain/Core/Entities/RequestModel";
import { ResponseModel } from "../../../Domain/Core/Entities/ResponseModel";
import { UsersFilter } from "../../../Domain/Session/Entities/UsersFilter";
import { User, OrmUser } from "../../../Domain/Session/Entities/User";
import { OrmUserLanguage } from "../../../Domain/Language/Entities/UserLanguage";
import { BaseRepository } from "../BaseRepository";

export class UsersRepository extends BaseRepository {
  async getUsersNotShared(
    request: RequestModel<UsersFilter>,
  ): Promise<ResponseModel<User[]>> {
    const response = new ResponseModel<User[]>(request.transactionId);
    try {
      const { data: filter = new UsersFilter() } = request;
      const { Op } = require("sequelize");

      const whereClause : any = {};
      if (filter.name) {
        whereClause.name = { [Op.iLike]: `%${filter.name}%` };
      }
      if (filter.email) {
        whereClause.email = { [Op.iLike]: `%${filter.email}%` };
      }

      // Get user IDs that already have access to this language
      const sharedUserIds = filter.languageId
        ? (
            await OrmUserLanguage.findAll({
              attributes: ["user_id"],
              where: {
                language_id: filter.languageId,
              },
              raw: true,
            })
          ).map((ul) => ul.user_id)
        : [];

      // Add NOT IN condition if there are shared users
      if (sharedUserIds.length > 0) {
        whereClause.id = { [Op.notIn]: sharedUserIds };
      }

      response.totalCount = await OrmUser.count({
        where: whereClause,
      });

      const results = await OrmUser.findAll({
        where: whereClause,
        order: [["name", "ASC"]],
        limit: filter.pageSize || undefined,
        offset:
          filter.pageNumber && filter.pageSize
            ? (filter.pageNumber - 1) * filter.pageSize
            : undefined,
      });

      response.data = results.map((row: any) => ({
        id: row.id,
        user: row.user,
        name: row.name,
        email: row.email,
      }));
    } catch (error) {
      console.error("Error in getUsersNotShared:", request, error);
      response.withError(500, "Internal server error");
    }

    return response;
  }

  async getAccessLevel(userId: string, languageId: number) {
    try {
      const response = await OrmUserLanguage.findOne({
        where: {
          user_id: userId,
          language_id: languageId,
        },
      });
      if (!response) {
        return null;
      } else {
        return response.access_level;
      }
    } catch (error) {
      console.error("Error in getAccessLevel:", error);
      return null;
    }
  }
}

export const UsersRepositoryInstance = new UsersRepository();

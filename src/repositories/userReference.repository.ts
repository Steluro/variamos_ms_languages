import UserReference from "../models/userReference.model";

export async function findUserByEmail(email: string) {
  return await UserReference.findOne({ where: { email : email } });
}
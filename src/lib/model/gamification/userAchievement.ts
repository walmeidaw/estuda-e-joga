import { UserAchievement as UserAchievementI } from "@/lib/database/db"
import { Updateable } from "kysely";
import { Insertable } from "kysely";
import { Selectable } from "kysely"

export type UserAchievement = Selectable<UserAchievementI>;
export type NewUserAchievement = Insertable<UserAchievementI>;
export type UpdateUserAchievement = Updateable<UserAchievementI>;

import { Achievement as AchievementI } from "@/lib/database/db"
import { Updateable } from "kysely";
import { Insertable } from "kysely";
import { Selectable } from "kysely"

export type Achievement = Selectable<AchievementI>;
export type NewAchievement = Insertable<AchievementI>;
export type UpdateAchievement = Updateable<AchievementI>;

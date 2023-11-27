import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Achievement {
  description: Generated<string | null>;
  icon: string | null;
  id: Generated<number>;
  incremental: Generated<number | null>;
  name: string;
  reveled: Generated<boolean | null>;
}

export interface Event {
  counter: Generated<number | null>;
  created_at: Generated<Timestamp>;
  id: Generated<number>;
  name: string;
  user_id: number;
}

export interface User {
  id: Generated<number>;
  name: string | null;
}

export interface UserAchievement {
  achievement_id: number;
  created_at: Generated<Timestamp>;
  id: Generated<number>;
  progress: Generated<number | null>;
  reveled: Generated<boolean | null>;
  unlocked: Generated<boolean | null>;
  unlocked_at: Timestamp | null;
  user_id: number;
}

export interface DB {
  achievement: Achievement;
  event: Event;
  user: User;
  user_achievement: UserAchievement;
}

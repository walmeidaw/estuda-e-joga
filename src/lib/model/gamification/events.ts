import { Event as EventI } from "@/lib/database/db"
import { Updateable } from "kysely";
import { Insertable } from "kysely";
import { Selectable } from "kysely"

export type Event = Selectable<EventI>;
export type NewEvent = Insertable<EventI>;
export type UpdateEvent = Updateable<EventI>;

import { db } from "@/lib/database"
import { Event, NewEvent, UpdateEvent } from "@/lib/model/gamification/events"

export enum EVENT {
    REGISTER = 'register',
    HIT = 'hit',
    MISS = 'miss',
    POINTER = 'pointer',
    READ = 'read'
}

export async function recordEvent( event : NewEvent ){
    return await db.insertInto('event').values(event).returningAll().executeTakeFirstOrThrow();
}

export async function findEventsById( id: number ){
    if( !id ) throw new Error("Missing event id to find")
    const entry = await db.selectFrom('event').where('id','=',id).selectAll().executeTakeFirst();
    return entry;
}

export async function getAllEvents( userId : number ){
    return await db.selectFrom('event').selectAll().execute();
}
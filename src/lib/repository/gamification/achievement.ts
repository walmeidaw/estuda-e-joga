import { db } from "@/lib/database"
import { Achievement, NewAchievement, UpdateAchievement } from "@/lib/model/gamification/achievement"


export async function createAchievement( achievement : NewAchievement ){
    return await db.insertInto('achievement').values( achievement).returningAll().executeTakeFirstOrThrow();
}

export async function findAchievementsById( id: number ){
    if( !id ) throw new Error("Missing achievement id to find")
    const entry = await db.selectFrom('achievement').where('id','=',id).selectAll().executeTakeFirst();
    return entry;
}

export async function updateAchievement( id: number, updateWith: UpdateAchievement ){
    if(!id) throw new Error("Missing achievement id to update")
    return await db.updateTable('achievement').set( updateWith ).where( 'id','=',id).execute();
}

export async function removeAchievement( id : number ){
    if(!id) throw new Error("Missing achievement id to remove")
    const entry = await db.deleteFrom('achievement').where('id','=', id).executeTakeFirst();
    return entry;
}

export async function getAllAchievements(){
    return await db.selectFrom('achievement').selectAll().orderBy('name asc').execute();
}
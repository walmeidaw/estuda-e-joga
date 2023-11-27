import { db } from "@/lib/database"
import { UserAchievement, NewUserAchievement, UpdateUserAchievement } from "@/lib/model/gamification/userAchievement"
import { findAchievementsById } from "./achievement";

export async function incrementAchievement( achievementId: number, userId: number, data : { progress: number, reveled?: boolean } ){
    const achievement = await findAchievementsById( achievementId );

    if( !achievement ){
        throw new Error("Missing achievement");
    }
    
    if( achievement.incremental == 1 ){
        throw new Error("This achievement cannot be increment");
    }

    let entry : UserAchievement | undefined = await getUserAchievement( achievementId, userId );
    if(!entry){
        entry = await createUserAchievement({
            achievement_id: achievementId,
            user_id: userId,
            reveled: data.reveled !== undefined ? data.reveled : achievement.reveled,
            unlocked: false,
            progress: 0
        })
    }

    if(entry == undefined){
        throw new Error("Fail to register increment");
    }

    let progress = ( entry?.progress && entry?.progress > 0 ) ? entry?.progress + data.progress : data.progress;
    const unlocked = progress >= ( achievement.incremental || 1 )

    entry = await updateUserAchievement( entry.id, { 
        progress,
        unlocked,
        unlocked_at: unlocked ? new Date() : null
    });

    return entry;
}

export async function unlockAchievement( achievementId: number, userId: number ){
    let entry : UserAchievement | undefined = await getUserAchievement( achievementId, userId );

    if(entry){
        throw new Error("This achievement already was unlocked");
    }
    
    const achievement = await findAchievementsById( achievementId );

    if( !achievement ){
        throw new Error("Missing achievement");
    }

    if( achievement.incremental && achievement.incremental > 1 ){
        throw new Error("This achievement is incremental");
    }

    entry = await createUserAchievement({
        achievement_id: achievementId,
        user_id: userId,
        reveled: achievement.reveled,
        unlocked: true,
        progress: 1,
        unlocked_at: new Date()
    })

    return entry;
}

export async function getUserAchievement( achievementId: number, userId: number ){
    let entry : UserAchievement | undefined = await db.selectFrom('user_achievement')
        .selectAll()
        .where( ({ eb, and }) => and([ 
            eb('user_achievement.achievement_id', '=', achievementId),
            eb('user_achievement.user_id', '=', userId)
        ])).executeTakeFirst();

    return entry;
}

export async function getAllUserAchievements( userId: number ){
    let entries : any | undefined = await db.selectFrom('user_achievement')
        .innerJoin('achievement', 'user_achievement.achievement_id','achievement.id')
        .select([
            'user_achievement.id',
            'user_achievement.user_id',
            'user_achievement.progress',
            'user_achievement.unlocked',
            'user_achievement.reveled',
            'user_achievement.created_at',
            'user_achievement.unlocked_at',
            'achievement.id as achievement_id',
            'achievement.name as achievement_name',
            'achievement.description as achievement_description',
            'achievement.icon as achievement_icon',
            'achievement.incremental as achievement_incremental',
            'achievement.reveled as achievement_reveled'
        ])
        .where( ({ eb, and, or }) => and([ 
            eb('user_achievement.user_id', '=', userId),
            or([
                eb('user_achievement.reveled', '=', true),
                eb('user_achievement.unlocked', '=', true),
            ])
        ]) ).orderBy('achievement_name asc').execute();

    return entries;
}

export async function updateUserAchievement( id: number, updateWith: UpdateUserAchievement ){
    if(!id) throw new Error("Missing achievement id to update")
    return await db.updateTable('user_achievement').set( updateWith ).returningAll().where( 'id','=', id ).executeTakeFirst();
}

export async function createUserAchievement( userAchievement : NewUserAchievement ){
    return await db.insertInto('user_achievement').values( userAchievement ).returningAll().executeTakeFirstOrThrow();
}
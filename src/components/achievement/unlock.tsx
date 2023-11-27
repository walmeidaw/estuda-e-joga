'use server';

import { revalidatePath } from 'next/cache'
import { incrementAchievement, unlockAchievement } from "@/lib/repository/gamification/userAchievement";
import { findAchievementsById } from '@/lib/repository/gamification/achievement';

export async function unlockAchievementAction( achievementId: number, userId: number ){
    const achievement = await findAchievementsById( achievementId );

    if( achievement ){
        if( achievement?.incremental && achievement?.incremental > 1){
            await incrementAchievement( achievementId, userId, { progress: 1, reveled: true } )
        }else{
            await unlockAchievement( achievementId, userId )
        }
    }

    revalidatePath('/')
}
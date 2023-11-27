import { getAllUserAchievements } from "@/lib/repository/gamification/userAchievement";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: NextRequest ){
    const data = await getAllUserAchievements(1)
    return NextResponse.json( { data: data || [] }, { status: 200 })
}
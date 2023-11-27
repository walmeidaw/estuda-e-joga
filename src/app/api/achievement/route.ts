import { createAchievement, getAllAchievements } from "@/lib/repository/gamification/achievement";
import { NextRequest, NextResponse } from "next/server";

export async function POST( request: NextRequest ){
    try {
        const data = await request.json()
        const entry = await createAchievement( data );
        return NextResponse.json( entry, { status: 200 })
    } catch (error) {
        return NextResponse.json( error, { status: 400 })
    }
}

export async function GET( request: NextRequest ){
    const data = await getAllAchievements();
    return NextResponse.json( data , { status: 200 })
}
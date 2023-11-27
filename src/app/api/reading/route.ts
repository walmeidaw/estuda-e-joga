import { incrementAchievement } from "@/lib/repository/gamification/userAchievement";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: NextRequest ){
    try {
        // usuário logado
        const userId = 1; 

        // informações da questão
        const subject = 'biology'
        const topic = 'botânica'

        await incrementAchievement(1, userId, {
            progress: 1,
            reveled: true
        })

        return NextResponse.json({ message : "Action recorded" })
    } catch (error) {
        return NextResponse.json( error, { status: 400 })
    }
}

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get("game")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const whereClause: any = {}

    if (game) {
      whereClause.game = game
    }

    const scores = await prisma.score.findMany({
      where: whereClause,
      include: {
        player: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        score: "desc",
      },
      take: limit,
    })

    return NextResponse.json(scores)
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}


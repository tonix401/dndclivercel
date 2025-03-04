import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const scores = await prisma.score.findMany({
      include: { player: true },
    })
    return NextResponse.json(scores)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch scores" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const score = await prisma.score.create({
      data: {
        score: body.score,
        game: body.game,
        playerId: body.playerId,
      },
      include: { player: true },
    })
    return NextResponse.json(score, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create score" }, { status: 500 })
  }
}


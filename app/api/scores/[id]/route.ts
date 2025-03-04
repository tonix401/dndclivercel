import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const score = await prisma.score.findUnique({
      where: { id: params.id },
      include: { player: true },
    })
    if (!score) {
      return NextResponse.json({ error: "Score not found" }, { status: 404 })
    }
    return NextResponse.json(score)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch score" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const score = await prisma.score.update({
      where: { id: params.id },
      data: {
        score: body.score,
        game: body.game,
      },
      include: { player: true },
    })
    return NextResponse.json(score)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update score" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.score.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: "Score deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete score" }, { status: 500 })
  }
}


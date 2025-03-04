import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const player = await prisma.player.findUnique({
      where: { id: params.id },
      include: { scores: true },
    })
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }
    return NextResponse.json(player)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const player = await prisma.player.update({
      where: { id: params.id },
      data: { name: body.name },
    })
    return NextResponse.json(player)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update player" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.player.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: "Player deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete player" }, { status: 500 })
  }
}


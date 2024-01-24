import { PrismaClient, Pilote } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { id }: { id: string }) {
  const pilote = await prisma.pilote.findUnique({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json({ pilote });
}

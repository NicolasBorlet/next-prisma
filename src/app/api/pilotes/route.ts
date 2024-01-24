import { PrismaClient, Pilote } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  req: NextRequest
) {
    const pilotes = await prisma.pilote.findMany()
    return NextResponse.json({ pilotes })
}

export async function POST(req: NextRequest) {
  // Extraction des données du corps de la requête
  const { name, age } = await req.json();

  // Création d'un nouveau pilote avec les données de la requête
  const newPilote = await prisma.pilote.create({
    data: {
      name,
      age,
    },
  });

  return NextResponse.json({ newPilote });
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  const library = await prisma.manga.findMany();
  return res.json(library);
}

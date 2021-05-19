import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === "POST") {
    const { body } = req;
    // TODO: Refactor logic for multiple source accounts
    const user = await prisma.user.upsert({
      where: { id: 1 },
      create: JSON.parse(body),
      update: JSON.parse(body),
    });

    return res.json(user);
  }
}

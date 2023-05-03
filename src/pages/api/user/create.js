import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  {
    await handlePOST(res, req);
  }
}
//POST -> creazione nuovo utente
async function handlePOST(res, req) {
  try {
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10),
      },
    });
    res.json(user).status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

import prisma from 'lib/prisma';
import { hash } from 'bcrypt';
import { Prisma } from '@prisma/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  {
    await handlePOST(req, res);
  }
}
//POST -> creazione nuovo utente
async function handlePOST(req, res) {
  try {
    const user = await prisma.User.create({
      data: {
        ...req.body,
        password: await hash(req.body.password, 10),
      },
    });
    res.status(201).send(user);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        res.status(409).json({ message: 'User already exists' });
      }
    }
    throw e;
  }
}

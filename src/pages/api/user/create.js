import prisma from 'lib/prisma';
import { hash } from 'bcrypt';

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
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: await hash(req.body.password, 10),
      },
    });
    res.json(user).status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

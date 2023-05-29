import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

//GET->get user data
async function handleGET(req, res, session) {
  const query = await prisma.User.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      surname: true,
      Wallet: {
        select: {
          id: true,
          startingAmount: true,
        },
      },
    },
  });
  res.json({ user: query });
}
//POST->create new user
async function handlePOST(req, res) {
  try {
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: await hash(req.body.password, 10),
      },
    });
    res.status(201).send({ success: true });
    console.log(201);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        res.status(409).json({ message: 'User already exists' });
      }
    }
    //throw e;
  }
}

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method == 'GET') {
    if (!session) {
      console.log(session);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await handleGET(req, res, session);
  }
  if (req.method == 'POST') {
    await handlePOST(req, res);
  }
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

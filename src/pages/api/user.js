import { Slabo_13px } from 'next/font/google';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

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

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    console.log(session);
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  } else {
    await handleGET(req, res, session);
  }
}

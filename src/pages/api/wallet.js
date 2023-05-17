import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

async function handlePOST(req, res) {
  const wallet = await prisma.Wallet.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      startingAmount: req.body.startingAmount,
      user: {
        connect: {
          id: req.body.userId,
        },
      },
    },
  });
  res.status(201).send(wallet);
}
export default async function handler(req, res) {
  const session = await getSession({ req });
  /* if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  } */
  if (req.method != 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  await handlePOST(req, res);
}

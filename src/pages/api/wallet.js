import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

//POST->create new wallet
async function handlePOST(req, res) {
  const wallet = await prisma.Wallet.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      startingAmount: req.body.startingAmount / 1,
      balance: req.body.startingAmount / 1,
      user: {
        connect: {
          id: req.body.userId,
        },
      },
    },
  });
  res.status(201).send({ success: true });
}
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === 'POST') await handlePOST(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  if (!session) {
    console.log(session);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

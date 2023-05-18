import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

async function handleGET(req, res, session) {
  const wallet = await prisma.User.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      Wallet: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
  const query = await prisma.Transaction.findMany({
    where: {
      walletId: wallet?.Wallet.id,
    },
    select: {
      id: true,
      amount: true,
      createdAt: true,
      updatedAt: true,
      type: true,
      currency: true,
    },
  });
  let balance = 0;
  query.map((transaction) => {
    if (transaction.type === 'sale') balance += transaction.amount;
    if (transaction.type === 'purchase') balance -= transaction.amount;
  });
  res.json({ transactions: query, balance: balance });
}

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    console.log(session);
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method == 'GET') {
    await handleGET(req, res, session);
  }
  if (req.method == 'POST') {
    await handlePOST(req, res, session);
  }
  if (req.method !== 'GET' || req.method !== 'POST')
    res.status(405).json({ message: 'Method Not Allowed' });
}

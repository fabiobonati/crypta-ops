import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

async function handleGET(req, res, session) {
  let assetValueFiat = 0;
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
  let walletId = wallet.Wallet.id;
  const transactionsPerCurrency = await prisma.Transaction.groupBy({
    by: ['currency'],
    select: {
      currency: true,
    },
    _sum: {
      amount: true,
    },
  });
  const response = await fetch('https://api.coincap.io/v2/assets')
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
  let count = 0;
  transactionsPerCurrency.map((currency) => {
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].symbol == currency.currency.toUpperCase()) {
        assetValueFiat += response.data[i].priceUsd * currency._sum.amount;
        count += 1;
      }
    }
  });
  res.json({ totalAssetsFiat: assetValueFiat });
}

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
  if (req.method === 'POST') await handlePOST(req, res);

  if (!session) {
    console.log(session);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

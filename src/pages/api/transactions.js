import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

async function handleGET(req, res, session, query) {
  //get wallet id from logged user
  const wallet = await prisma.User.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      Wallet: {
        select: {
          id: true,
          startingAmount: true,
        },
      },
    },
  });
  // if wallet not found, return 404
  if (!wallet.Wallet)
    return res.status(404).json({ message: 'Wallet not found' });

  // if call has currency query, return transactions for that currency
  if (query.currency) {
    const transaction = await prisma.Transaction.findMany({
      where: {
        walletId: wallet?.Wallet.id,
        currency: query.currency,
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
    return res.json({ transaction: transaction });
  }

  const currencies = await prisma.transaction.groupBy({
    by: ['currency'],
    where: {
      walletId: wallet?.Wallet.id,
    },
  });

  const transactions = await prisma.Transaction.findMany({
    where: {
      walletId: wallet?.Wallet.id,
    },
    select: {
      id: true,
      amount: true,
      createdAt: true,
      updatedAt: true,
      currency: true,
    },
  });
  //response with an object containing a list of transactions for each currency
  res.json(transactions);
}

//POST-> create a new transaction
async function handlePOST(req, res, session) {
  const { amount, currency, email } = req.body;
  const wallet = await prisma.User.findUnique({
    where: {
      email: email,
    },
    select: {
      Wallet: {
        select: {
          id: true,
          startingAmount: true,
          balance: true,
        },
      },
    },
  });
  if (!wallet.Wallet)
    return res.status(404).json({ message: 'Wallet not found' });
  if (wallet.Wallet.balance < amount / 1) {
    return res.status(403).json({ success: false });
  }
  const response = await fetch(`https://api.coincap.io/v2/assets/${currency}`);
  const data = await response.json();
  const cryptoPrice = data.data.priceUsd;
  const cryptoQuantity = amount / cryptoPrice;
  //create new transaction
  const newTransaction = await prisma.Transaction.create({
    data: {
      amount: cryptoQuantity,
      currency: currency,
      walletId: wallet.Wallet.id,
    },
  });
  //update wallet balance
  const updatedWallet = await prisma.Wallet.update({
    where: {
      id: wallet.Wallet.id,
    },
    data: {
      balance: wallet.Wallet.balance - amount / 1,
    },
  });
  res.status(201).json({ success: true });
}

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { query } = req;
  if (req.method === 'GET') {
    return await handleGET(req, res, session, query);
  }
  if (req.method === 'POST') {
    return await handlePOST(req, res, session);
  }
  if (req.method !== 'GET' && req.method !== 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' });
  if (!session) {
    console.log(session);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

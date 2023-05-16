import { compare } from 'bcrypt';
import prisma from 'lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  } else {
    await handlePOST(req, res);
  }
}
async function handlePOST(req, res) {
  const query = await prisma.User.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      password: true,
    },
  });

  if (query && bcrypt.compare(req.body.password, query.password)) {
    res.json(query);
  } else res.status(400).json('Invalid credentials');
}

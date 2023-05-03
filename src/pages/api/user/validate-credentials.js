import { PrismaClient } from '@prisma/client';

export default async function handler(res, req) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  {
    await handlePOST(res, req);
  }
}
async function handlePOST(res, req) {
  const user = await user.prisma.findUnique({
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
  console.log(user.password);
  console.log(req.body.password);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json(user);
  } else res.status(400).json('Invalid credentials');
}

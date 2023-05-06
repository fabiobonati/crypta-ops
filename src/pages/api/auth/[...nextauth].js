import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            name: true,
            surname: true,
            password: true,
          },
        });
        if (!user) throw new Error('No user found');
        const passwordCheck = await compare(
          credentials.password,
          user.password
        );
        if (!passwordCheck) throw new Error('Wrong password');
        return user;
      },
    }),
  ],
  baseUrl: process.env.NEXTAUTH_URL,
  pages: {
    signIn: 'auth/signin',
  },
};

export default NextAuth(authOptions);

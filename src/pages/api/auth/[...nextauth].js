import NextAuth from 'next-auth/next';
import prisma from 'lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';

console.log(process.env.NEXTAUTH_SECRET);
export const authOptions = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
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
        console.log(user);
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  baseUrl: process.env.NEXTAUTH_URL,
  pages: {
    signIn: 'auth/signin',
  },
};
console.log(authOptions.secret);
export default NextAuth(authOptions);

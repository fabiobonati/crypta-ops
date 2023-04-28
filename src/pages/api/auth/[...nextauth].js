import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize(credentials, req) {
        const { email, password } = credentials;

        if (email !== 'fabio@gmail.com' || password !== '1234') {
          throw new Error('Invalid email or password');
        }

        return { email, password };
      },
    }),
  ],
  pages: {
    signIn: 'auth/signin',
  },
};

export default NextAuth(authOptions);

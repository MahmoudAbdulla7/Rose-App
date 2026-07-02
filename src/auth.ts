import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from './features/auth/lib/apis/login.api';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await login({
          username: credentials?.username ?? '',
          password: credentials?.password ?? '',
        });

        if (response.status && response.payload) {
          return {
            id: response.payload.user.id,
            user: response.payload.user,
            accessToken: response.payload.token,
          };
        }

        throw new Error(
          typeof response.message === 'string' ? response.message : 'CredentialsSignin',
        );
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXTAUTH_SESSION_MAXAGE ?? 86400), // 24 hours
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      }

      if (session && trigger === 'update') {
        token.accessToken = session.accessToken;
        token.user = session.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

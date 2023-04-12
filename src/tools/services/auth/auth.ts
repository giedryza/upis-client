import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { endpoints } from 'config';
import { api, getJsonBody } from 'tools/services';
import { Session } from 'domain/users';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * Number(process.env.NEXTAUTH_JWT_EXPIRES_IN_DAYS),
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, _req) => {
        if (!credentials) return null;

        const { email, password } = credentials;

        try {
          const { data } = await api('post')<Session>(endpoints.users.signin, {
            body: getJsonBody({ email, password }),
          });

          return {
            ...data.user,
            id: data.user._id,
            token: data.token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      if (trigger === 'update') {
        return {
          ...token,
          ...(!!session && {
            jwt: session.token,
            id: session.user._id,
            email: session.user.email,
            role: session.user.role,
          }),
        };
      }

      return {
        ...token,
        ...(!!user && {
          jwt: user.token,
          id: user._id,
          email: user.email,
          role: user.role,
        }),
      };
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        jwt: token.jwt,
        user: {
          id: token.id,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
};

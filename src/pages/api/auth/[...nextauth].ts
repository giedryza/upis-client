import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { getLoaders } from 'domain/users';

const options: NextAuthOptions = {
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

        const { loaders } = getLoaders();

        try {
          const { data } = await loaders.signin({ email, password });

          return {
            ...data.user,
            token: data.token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
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

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options);
};

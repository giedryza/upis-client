import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { endpoints, routes } from 'config';
import { api, generateUrl, getJsonBody } from 'tools/services';
import { Session } from 'domain/users';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * Number(process.env.NEXTAUTH_JWT_EXPIRES_IN_DAYS),
  },
  pages: {
    signIn: routes.auth.signin,
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, _req) => {
        if (!credentials) return null;

        const { email, password } = credentials;

        try {
          const { data } = await api('post')<Session>(
            generateUrl(endpoints.users.signin.credentials),
            { body: getJsonBody({ email, password }) }
          );

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
    CredentialsProvider({
      id: 'token',
      credentials: {
        token: {},
      },
      authorize: async (credentials, _req) => {
        if (!credentials) return null;

        const { token } = credentials;

        try {
          const { data } = await api('post')<Session>(
            generateUrl(endpoints.users.signin.token),
            { body: getJsonBody({ token }) }
          );

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: async (_, { id_token }) => {
        if (!id_token) throw new Error();

        const { data } = await api('post')<Session>(
          generateUrl(endpoints.users.signin.google),
          { body: getJsonBody({ token: id_token }) }
        );

        return {
          _id: data.user._id,
          id: data.user._id,
          email: data.user.email,
          role: data.user.role,
          token: data.token,
        };
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

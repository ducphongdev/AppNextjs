import NextAuth, { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { env } from '@/config/environment';
import dayjs from 'dayjs';
import { JWT } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

async function refreshAccessToken(token: JWT) {
  const resFetch = await fetch(`${env.API_ENDPOINT}/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: token?.refresh_token,
    }),
  });

  const res = await resFetch.json();

  if (res.ok) {
    return {
      ...token,
      access_token: res?.access_token ?? '',
      refresh_token: res?.refresh_token ?? '',
      access_expire: dayjs(new Date())
        .add(
          Number(env.TOKEN_EXPIRE_NUMBER as any),
          env.TOKEN_EXPIRE_UNIT as any
        )
        .unix(),
    };
  } else {
    return {
      ...token,
    };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${env.API_ENDPOINT}/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            credentials: 'include',
          });
          const user = await res.json();

          if (!res.ok) {
            throw new Error('Network response was not ok');
          } else {
            return user;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.user = user.user;
        token.access_expire = dayjs(new Date())
          .add(
            Number(env.TOKEN_EXPIRE_NUMBER as any),
            env.TOKEN_EXPIRE_UNIT as any
          )
          .unix();
      }

      const isTimeAfter = dayjs(dayjs(new Date())).isAfter(
        dayjs.unix((token?.access_expire as number) ?? 0)
      );
      if (isTimeAfter) {
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user = token.user;
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: Number(env.TOKEN_EXPIRE_NUMBER) as any,
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

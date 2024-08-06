import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

import NextAuth from 'next-auth/next';
import { authOptions } from '@lib/auth';

const handler: typeof NextAuth = NextAuth(authOptions);
export { handler as GET, handler as POST };

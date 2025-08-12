import 'reflect-metadata';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@lib/prisma';
import { RoutesEnum } from '@ui/routes.enum';
import { SignInUseCase } from '@api/modules/auth/domain/usecases/signin.usecase';
import { container } from 'tsyringe';
import type { UserModelDto } from '@shared/modules/users/user.model.dto';
import type { SignInPayloadDto } from '@shared/modules/auth/dto/sign-in/sign-in.payload.dto';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: SignInPayloadDto | undefined
      ): Promise<UserModelDto | null> {
        const signInUseCase: SignInUseCase = container.resolve(SignInUseCase);
        return await signInUseCase.handle(credentials || null);
      },
    }),
  ],
  pages: {
    signIn: RoutesEnum.LOGIN,
    signOut: RoutesEnum.LOGIN,
    newUser: RoutesEnum.WORKSPACE,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
import { getCsrfToken } from 'next-auth/react'
import { SigninMessage } from '@/utils/SignInMessage'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Solana',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
        },
        signature: {
          label: 'Signature',
          type: 'text',
        },
      },
      async authorize(credentials, req) {
        try {
          const signinMessage = new SigninMessage(
            JSON.parse(credentials?.message ?? '{}'),
          )
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL ?? '')
          if (signinMessage.domain !== nextAuthUrl.host) {
            return null
          }

          const csrf = await getCsrfToken({ req: { headers: req.headers } })
          if (signinMessage.nonce !== csrf) {
            return null
          }

          const validationResult = await signinMessage.validate(
            credentials?.signature ?? '',
          )

          if (!validationResult)
            throw new Error('Could not validate the signed message')

          // Register or fetch user
          await prisma.user.upsert({
            where: { address: signinMessage.publicKey },
            create: {
              address: signinMessage.publicKey,
            },
            update: {},
          })

          return {
            id: signinMessage.publicKey,
          }
        } catch (e) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.publicKey = token.sub
      if (session.user) {
        session.user.name = token.sub
        session.user.image = `https://ui-avatars.com/api/?name=${token.sub}&background=random`
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
}

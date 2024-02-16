'use client'

import { useEffect } from 'react'
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { SigninMessage } from '@/utils/SignInMessage'
import bs58 from 'bs58'

export default function Auth() {
  const { data: session, status } = useSession()

  const wallet = useWallet()
  const walletModal = useWalletModal()

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) {
        walletModal.setVisible(true)
      }

      const csrf = await getCsrfToken()
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        nonce: csrf,
      })

      const data = new TextEncoder().encode(message.prepare())
      const signature = await wallet.signMessage(data)
      const serializedSignature = bs58.encode(signature)

      signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature: serializedSignature,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (wallet.connected && status === 'unauthenticated') {
      handleSignIn()
    }
  }, [wallet.connected])

  return (
    <main className="flex min-h-screen flex-col items-center justify-items-center justify-center">
      {!session && (
        <>
          <span>You are not signed in</span>
          <button onClick={handleSignIn}>Sign in</button>
        </>
      )}
      {session?.user && (
        <>
          <strong>{session.user.email ?? session.user.name}</strong>
          <button
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign out
          </button>
        </>
      )}
    </main>
  )
}

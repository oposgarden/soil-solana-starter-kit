'use client'

import { signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-items-center justify-center">
      <div className="text-8xl font-bold">Solana Starter Kit</div>
      {session?.user && (
        <button
          className="text-white bg-red-500 border rounded py-2 px-4 mt-4"
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Sign out
        </button>
      )}
    </main>
  )
}

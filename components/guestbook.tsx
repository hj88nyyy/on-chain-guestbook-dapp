"use client"

import { useReadContract } from "wagmi"
import { GUESTBOOK_ABI, GUESTBOOK_ADDRESS, type GuestbookEntry } from "@/lib/contract"
import { ConnectWallet } from "@/components/connect-wallet"
import { GuestbookForm } from "@/components/guestbook-form"
import { GuestbookList } from "@/components/guestbook-list"
import { BookText } from "lucide-react"

export function Guestbook() {
  const { data, isLoading, refetch } = useReadContract({
    address: GUESTBOOK_ADDRESS,
    abi: GUESTBOOK_ABI,
    functionName: "getEntries",
  })

  const entries = data as readonly GuestbookEntry[] | undefined

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookText className="size-5" />
          </span>
          <div>
            <h1 className="text-xl font-semibold leading-tight text-foreground">온체인 방명록</h1>
            <p className="text-sm text-muted-foreground">Sepolia 테스트넷</p>
          </div>
        </div>
        <ConnectWallet />
      </header>

      <GuestbookForm onConfirmed={() => refetch()} />

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          방명록 {entries ? `(${entries.length})` : ""}
        </h2>
        <GuestbookList entries={entries} isLoading={isLoading} />
      </section>
    </main>
  )
}

"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { shortenAddress, formatTimestamp } from "@/lib/format"
import type { GuestbookEntry } from "@/lib/contract"
import { Loader2, MessageSquareDashed, User } from "lucide-react"

type Props = {
  entries: readonly GuestbookEntry[] | undefined
  isLoading: boolean
}

export function GuestbookList({ entries, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
        <span>방명록을 불러오는 중...</span>
      </div>
    )
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
        <MessageSquareDashed className="size-8" />
        <p>아직 남겨진 방명록이 없습니다.</p>
      </div>
    )
  }

  // Newest first.
  const sorted = [...entries].sort((a, b) => Number(b.timestamp - a.timestamp))

  return (
    <div className="flex flex-col gap-3">
      {sorted.map((entry, i) => (
        <Card key={`${entry.author}-${entry.timestamp.toString()}-${i}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <span className="flex items-center gap-2 font-mono text-sm text-foreground">
              <User className="size-4 text-muted-foreground" />
              {shortenAddress(entry.author)}
            </span>
            <time className="text-xs text-muted-foreground">{formatTimestamp(entry.timestamp)}</time>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap break-words text-pretty leading-relaxed text-foreground">
              {entry.message}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

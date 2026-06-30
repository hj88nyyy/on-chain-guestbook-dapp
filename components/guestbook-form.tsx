"use client"

import { useEffect, useState } from "react"
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { GUESTBOOK_ABI, GUESTBOOK_ADDRESS } from "@/lib/contract"
import { Loader2, PenLine } from "lucide-react"

export function GuestbookForm({ onConfirmed }: { onConfirmed?: () => void }) {
  const { isConnected } = useAccount()
  const [message, setMessage] = useState("")

  const { data: hash, writeContract, isPending, error, reset } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // After confirmation: clear input, reset write state, and refresh the list.
  useEffect(() => {
    if (isConfirmed) {
      setMessage("")
      reset()
      onConfirmed?.()
    }
  }, [isConfirmed, reset, onConfirmed])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed) return
    writeContract({
      address: GUESTBOOK_ADDRESS,
      abi: GUESTBOOK_ABI,
      functionName: "sign",
      args: [trimmed],
    })
  }

  const busy = isPending || isConfirming

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isConnected ? "방명록을 남겨보세요..." : "먼저 지갑을 연결하세요"}
            disabled={!isConnected || busy}
            rows={3}
            className="resize-none"
          />

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {isPending && "지갑에서 서명 대기 중..."}
              {isConfirming && "트랜잭션 확정 대기 중..."}
              {!busy && error && (
                <span className="text-destructive">{prettyError(error.message)}</span>
              )}
            </p>
            <Button type="submit" disabled={!isConnected || busy || !message.trim()}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : <PenLine className="size-4" />}
              {busy ? "전송 중" : "남기기"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function prettyError(msg: string) {
  if (msg.includes("User rejected")) return "요청을 거부했습니다."
  return "오류가 발생했습니다. 다시 시도해주세요."
}

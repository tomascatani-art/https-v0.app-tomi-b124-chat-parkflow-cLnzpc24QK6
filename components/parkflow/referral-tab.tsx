"use client"

import { useState } from "react"
import { Gift, Copy, Check, Share2, Wallet } from "lucide-react"
import { referrals, REFERRAL_CODE } from "@/lib/parkflow-data"
import { SectionTitle } from "./ui"

export function ReferralTab() {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(REFERRAL_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  async function share() {
    const text = `Usá mi código ${REFERRAL_CODE} en ParkFlow y recibí $10 de crédito.`
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "ParkFlow", text })
        return
      } catch {
        /* cancelled */
      }
    }
    copyCode()
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <h1 className="font-display text-lg font-bold text-foreground">Invitá amigos</h1>

      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand/70 p-5 text-brand-foreground">
        <Gift className="size-7" aria-hidden="true" />
        <div className="mt-2 font-display text-xl font-bold text-balance">Ganá $50 por cada amigo</div>
        <p className="mt-1 text-sm opacity-90">Ellos reciben $10 de crédito también.</p>

        <button
          onClick={copyCode}
          className="mt-4 flex w-full items-center justify-between gap-2 rounded-xl bg-brand-foreground/15 px-4 py-3 font-mono text-sm font-bold tracking-wider backdrop-blur transition-colors hover:bg-brand-foreground/25"
        >
          {REFERRAL_CODE}
          {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        </button>
        <button
          onClick={share}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-foreground py-3 text-sm font-semibold text-brand"
        >
          <Share2 className="size-4" aria-hidden="true" />
          Compartir código
        </button>
      </div>

      <div>
        <SectionTitle className="mb-3">Amigos invitados</SectionTitle>
        <div className="flex flex-col gap-2">
          {referrals.map((r) => {
            const pending = r.reward === "Pendiente"
            const initials = r.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")
            return (
              <div
                key={r.name}
                className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: r.color }}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{r.name}</div>
                    <div className="text-[11px] text-muted-foreground">{r.when}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`flex items-center justify-end gap-1 text-sm font-bold ${
                      pending ? "text-muted-foreground" : "text-success"
                    }`}
                  >
                    {r.reward}
                    {!pending && <Check className="size-3.5" aria-hidden="true" />}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{r.trips}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl bg-accent p-4 ring-1 ring-brand/20">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Wallet className="size-6" aria-hidden="true" />
        </div>
        <div>
          <div className="font-display text-lg font-bold text-accent-foreground">Total ganado: $200</div>
          <div className="text-xs text-accent-foreground/80">Crédito de 4 referidos · 1 pendiente</div>
        </div>
      </div>
    </div>
  )
}

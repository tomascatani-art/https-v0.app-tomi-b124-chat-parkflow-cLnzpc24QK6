"use client"

import { useState, type ReactNode } from "react"
import { X, CreditCard, Wallet, Building2, Smartphone, CircleCheck, type LucideIcon } from "lucide-react"
import { tripHistory, paymentMethods } from "@/lib/parkflow-data"

function Sheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-[1000] flex items-end justify-center" role="dialog" aria-modal="true" aria-label={title}>
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
      />
      <div className="relative z-10 max-h-[80%] w-full overflow-y-auto rounded-t-3xl bg-background p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-accent"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function HistoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} title="Historial de viajes" onClose={onClose}>
      <div className="flex flex-col gap-2 pb-2">
        {tripHistory.map((t, i) => (
          <div key={i} className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-brand">{t.date}</div>
            <div className="mt-1 font-display text-base font-bold text-foreground">{t.zone}</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CircleCheck className="size-3.5 text-success" aria-hidden="true" />
              {t.detail}
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  )
}

const PAY_ICONS: Record<string, LucideIcon> = {
  card: CreditCard,
  wallet: Wallet,
  bank: Building2,
  phone: Smartphone,
}

export function PaymentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState(0)
  return (
    <Sheet open={open} title="Método de pago" onClose={onClose}>
      <div className="flex flex-col gap-2 pb-2">
        {paymentMethods.map((m, i) => {
          const Icon = PAY_ICONS[m.icon] ?? CreditCard
          const active = selected === i
          return (
            <button
              key={m.name}
              onClick={() => setSelected(i)}
              className={`flex items-center gap-3 rounded-2xl p-4 text-left ring-1 transition-colors ${
                active ? "bg-accent ring-brand" : "bg-card ring-border hover:bg-secondary"
              }`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                  active ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">{m.name}</div>
                <div className="text-[11px] text-muted-foreground">{m.desc}</div>
              </div>
              {active && <CircleCheck className="size-5 text-brand" aria-hidden="true" />}
            </button>
          )
        })}
      </div>
    </Sheet>
  )
}

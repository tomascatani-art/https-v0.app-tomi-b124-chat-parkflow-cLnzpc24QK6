import Image from "next/image"
import { MapPin, House, Clock, CreditCard, LogOut, ChevronRight } from "lucide-react"
import { profileStats, favoriteZones } from "@/lib/parkflow-data"
import { SectionTitle } from "./ui"

export function ProfileTab({
  onOpenHistory,
  onOpenPayment,
}: {
  onOpenHistory: () => void
  onOpenPayment: () => void
}) {
  return (
    <div className="flex flex-col gap-5 py-4">
      <div className="flex flex-col items-center px-4 pt-2 text-center">
        <div className="relative size-20 overflow-hidden rounded-full bg-gradient-to-br from-brand to-brand/70 ring-4 ring-brand/20">
          <Image src="/avatar-tomas.png" alt="Tomás Catani" width={80} height={80} className="size-full object-cover" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-display text-lg font-bold text-foreground">Tomás Catani</span>
          <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warning-foreground">
            Pro
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4">
        {profileStats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card px-2 py-3 text-center shadow-sm ring-1 ring-border">
            <div className="font-display text-lg font-bold text-foreground tabular-nums">{s.value}</div>
            <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground text-balance">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="px-4">
        <SectionTitle className="mb-3">Zonas favoritas</SectionTitle>
        <div className="flex flex-col gap-2">
          {favoriteZones.map((z) => {
            const Icon = z.icon === "home" ? House : MapPin
            return (
              <div
                key={z.name}
                className="flex items-center justify-between rounded-2xl bg-card p-3.5 shadow-sm ring-1 ring-border"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-accent text-brand">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{z.name}</span>
                </div>
                <span className="text-[11px] text-muted-foreground">{z.visits}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4">
        <button
          onClick={onOpenHistory}
          className="flex items-center justify-between rounded-2xl bg-card p-3.5 text-sm font-medium text-foreground shadow-sm ring-1 ring-border transition-colors hover:bg-secondary"
        >
          <span className="flex items-center gap-3">
            <Clock className="size-4 text-brand" aria-hidden="true" />
            Ver historial completo
          </span>
          <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
        </button>
        <button
          onClick={onOpenPayment}
          className="flex items-center justify-between rounded-2xl bg-card p-3.5 text-sm font-medium text-foreground shadow-sm ring-1 ring-border transition-colors hover:bg-secondary"
        >
          <span className="flex items-center gap-3">
            <CreditCard className="size-4 text-brand" aria-hidden="true" />
            Método de pago
          </span>
          <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
        </button>
        <button className="flex items-center gap-3 rounded-2xl bg-card p-3.5 text-sm font-medium text-danger shadow-sm ring-1 ring-border transition-colors hover:bg-danger/5">
          <LogOut className="size-4" aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

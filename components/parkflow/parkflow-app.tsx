"use client"

import { useState } from "react"
import Image from "next/image"
import { Home, Map, BarChart3, Gift, Building2, User, Settings, Signal, Wifi, BatteryFull } from "lucide-react"
import type { Zone } from "@/lib/parkflow-data"
import { LogoMark } from "./logo"
import { HomeTab } from "./home-tab"
import { RoutesTab } from "./routes-tab"
import { StatsTab } from "./stats-tab"
import { ReferralTab } from "./referral-tab"
import { AdminTab } from "./admin-tab"
import { ProfileTab } from "./profile-tab"
import { HistoryModal, PaymentModal } from "./modals"

type TabId = "home" | "routes" | "stats" | "referral" | "admin" | "profile"

const NAV: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "routes", label: "Rutas", icon: Map },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "referral", label: "Referir", icon: Gift },
  { id: "admin", label: "Admin", icon: Building2 },
  { id: "profile", label: "Perfil", icon: User },
]

export function ParkflowApp() {
  const [tab, setTab] = useState<TabId>("home")
  const [destination, setDestination] = useState<Zone | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)

  function goToZone(zone: Zone) {
    setDestination(zone)
    setTab("routes")
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-frame p-0 sm:p-6">
      <div className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-background shadow-2xl sm:h-[896px] sm:rounded-[2.5rem] sm:ring-8 sm:ring-black/80">
        {/* Status bar */}
        <div className="flex shrink-0 items-center justify-between bg-frame px-6 py-2 text-xs font-medium text-white/90">
          <span className="tabular-nums">9:47</span>
          <span className="text-white/70">Buenos Aires · 22°</span>
          <span className="flex items-center gap-1.5">
            <Signal className="size-3.5" aria-hidden="true" />
            <Wifi className="size-3.5" aria-hidden="true" />
            <BatteryFull className="size-4" aria-hidden="true" />
          </span>
        </div>

        {/* Header */}
        <header className="flex shrink-0 items-center justify-between bg-frame px-4 pb-3 pt-1">
          <div className="flex items-center gap-2">
            <LogoMark className="size-8" />
            <span className="font-display text-lg font-bold text-white">ParkFlow</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTab("profile")}
              aria-label="Perfil"
              className="size-9 overflow-hidden rounded-full ring-2 ring-white/30 transition-transform hover:scale-105"
            >
              <Image
                src="/avatar-tomas.png"
                alt="Tomás Catani"
                width={36}
                height={36}
                className="size-full object-cover"
              />
            </button>
            <button
              aria-label="Configuración"
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <Settings className="size-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain bg-background">
          {tab === "home" && <HomeTab onGoToZone={goToZone} />}
          {tab === "routes" && <RoutesTab destination={destination} />}
          {tab === "stats" && <StatsTab />}
          {tab === "referral" && <ReferralTab />}
          {tab === "admin" && <AdminTab />}
          {tab === "profile" && (
            <ProfileTab onOpenHistory={() => setHistoryOpen(true)} onOpenPayment={() => setPaymentOpen(true)} />
          )}
        </div>

        {/* Bottom nav */}
        <nav className="grid shrink-0 grid-cols-6 border-t border-border bg-card px-1 pb-1 pt-1.5">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = tab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition-colors ${
                  active ? "text-brand" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" aria-hidden="true" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <HistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} />
        <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} />
      </div>
    </main>
  )
}

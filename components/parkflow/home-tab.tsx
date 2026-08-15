"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { Search, Clock, Wallet, Star, Users, Navigation } from "lucide-react"
import { zones, todayStats, type Zone } from "@/lib/parkflow-data"
import { AvailabilityBadge, StatCard } from "./ui"
import { StreetView } from "./street-view"

const ZoneMap = dynamic(() => import("./zone-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
      Cargando mapa…
    </div>
  ),
})

export function HomeTab({ onGoToZone }: { onGoToZone: (zone: Zone) => void }) {
  const [query, setQuery] = useState("")
  const [target, setTarget] = useState<[number, number] | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return zones
    return zones.filter((z) => z.name.toLowerCase().includes(q))
  }, [query])

  function selectZone(zone: Zone) {
    setTarget([zone.lat, zone.lng])
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-56 shrink-0">
        <ZoneMap target={target} onSelect={(name) => setQuery(name)} />
        <div className="pointer-events-none absolute bottom-3 left-3 z-[500] flex gap-2 text-[11px] font-medium">
          {[
            { c: "bg-success", l: "Alta" },
            { c: "bg-warning", l: "Media" },
            { c: "bg-danger", l: "Baja" },
          ].map((i) => (
            <span
              key={i.l}
              className="flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-foreground shadow-sm backdrop-blur"
            >
              <span className={`size-2 rounded-full ${i.c}`} />
              {i.l}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 -mt-4 rounded-t-3xl bg-background px-4 pt-4">
        <div className="flex items-center gap-2 rounded-2xl bg-card px-3 py-2.5 shadow-sm ring-1 ring-border">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar zona, dirección…"
            aria-label="Buscar zona o dirección"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {todayStats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>

        <div className="mt-4">
          <StreetView zoneName={filtered[0]?.name ?? "Palermo"} />
        </div>

        <div className="mt-4 flex flex-col gap-3 pb-2">
          {filtered.map((zone) => (
            <article
              key={zone.name}
              onClick={() => selectZone(zone)}
              className="cursor-pointer rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-foreground">{zone.name}</h2>
                <AvailabilityBadge pct={zone.availability} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-brand" aria-hidden="true" />
                  {zone.distance} distancia
                </span>
                <span className="flex items-center gap-1.5">
                  <Wallet className="size-3.5 text-brand" aria-hidden="true" />
                  Desde {zone.price}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="size-3.5 text-brand" aria-hidden="true" />
                  {zone.rating} estrellas
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5 text-brand" aria-hidden="true" />
                  {zone.spots} spots
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onGoToZone(zone)
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
              >
                <Navigation className="size-4" aria-hidden="true" />
                Ir ahora
              </button>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No se encontraron zonas para “{query}”.</p>
          )}
        </div>
      </div>
    </div>
  )
}

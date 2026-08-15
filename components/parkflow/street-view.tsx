"use client"

import { Navigation } from "lucide-react"
import { streetSpots } from "@/lib/parkflow-data"

function TopCar({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 68" className="h-full w-full" aria-hidden="true">
      {/* body */}
      <rect x="6" y="4" width="28" height="60" rx="9" fill={color} />
      {/* roof */}
      <rect x="10" y="20" width="20" height="26" rx="6" fill="rgba(255,255,255,0.18)" />
      {/* windshield */}
      <rect x="11" y="12" width="18" height="9" rx="4" fill="rgba(255,255,255,0.55)" />
      {/* rear window */}
      <rect x="11" y="47" width="18" height="8" rx="4" fill="rgba(255,255,255,0.4)" />
      {/* headlights */}
      <circle cx="11" cy="8" r="2" fill="rgba(255,255,255,0.85)" />
      <circle cx="29" cy="8" r="2" fill="rgba(255,255,255,0.85)" />
    </svg>
  )
}

export function StreetView({ zoneName }: { zoneName: string }) {
  const spots = streetSpots(zoneName.length)
  const freeCount = spots.filter((s) => !s.occupied).length

  return (
    <section className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-bold text-foreground">En la vía pública</h3>
          <p className="text-[11px] text-muted-foreground">{zoneName} · en tiempo real</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {freeCount} lugares libres
        </span>
      </div>

      {/* Curbside strip */}
      <div className="mt-3 overflow-x-auto">
        <div className="relative flex min-w-max items-end gap-1.5 rounded-xl bg-[#2a3550] p-2.5">
          {/* curb line */}
          <div className="pointer-events-none absolute inset-x-2 bottom-1 h-1 rounded-full bg-[#f0a422]/60" />
          {spots.map((spot) =>
            spot.occupied ? (
              <div key={spot.id} className="h-16 w-9 shrink-0 rounded-md bg-white/5 p-0.5">
                <TopCar color={spot.color} />
              </div>
            ) : (
              <div
                key={spot.id}
                className="flex h-16 w-9 shrink-0 flex-col items-center justify-center rounded-md border-2 border-dashed border-success bg-success/15 text-success"
              >
                <Navigation className="size-4" aria-hidden="true" />
                <span className="mt-1 text-[8px] font-bold uppercase leading-none">Libre</span>
              </div>
            ),
          )}
        </div>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Los espacios <span className="font-semibold text-success">verdes</span> están libres para estacionar ahora
        mismo.
      </p>
    </section>
  )
}

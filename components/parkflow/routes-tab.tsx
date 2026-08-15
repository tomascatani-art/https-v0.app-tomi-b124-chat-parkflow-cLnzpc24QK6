"use client"

import dynamic from "next/dynamic"
import { Navigation, MapPin, Flag } from "lucide-react"
import type { Zone } from "@/lib/parkflow-data"

const ZoneMap = dynamic(() => import("./zone-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
      Cargando mapa…
    </div>
  ),
})

export function RoutesTab({ destination }: { destination: Zone | null }) {
  const target: [number, number] | null = destination ? [destination.lat, destination.lng] : null

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-4 pb-3 pt-4">
        <h1 className="font-display text-lg font-bold text-foreground">Navegación GPS</h1>
        <div className="mt-3 rounded-2xl bg-success/10 p-3 ring-1 ring-success/25">
          <div className="flex items-center gap-2 text-sm font-semibold text-success">
            <Navigation className="size-4" aria-hidden="true" />
            Ruta activa
          </div>
          <p className="mt-1 text-xs text-success-foreground/80">Dirección giro a giro hacia tu zona de destino.</p>
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border">
          <div className="flex flex-col items-center pt-1">
            <MapPin className="size-4 text-brand" aria-hidden="true" />
            <span className="my-1 h-6 w-px bg-border" />
            <Flag className="size-4 text-success" aria-hidden="true" />
          </div>
          <div className="flex flex-1 flex-col gap-3 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Origen</div>
              <div className="font-medium text-foreground">Tu ubicación actual</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Destino</div>
              <div className="font-medium text-foreground">{destination ? destination.name : "Palermo Alto"}</div>
            </div>
          </div>
          {destination && (
            <div className="text-right">
              <div className="font-display text-base font-bold text-brand">{destination.distance}</div>
              <div className="text-[11px] text-muted-foreground">estimado</div>
            </div>
          )}
        </div>
      </div>

      <div className="min-h-64 flex-1">
        <ZoneMap target={target} />
      </div>
    </div>
  )
}

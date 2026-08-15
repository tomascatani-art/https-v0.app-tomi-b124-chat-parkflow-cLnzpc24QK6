import { Activity } from "lucide-react"
import { adminStats, adminZones, availabilityLevel } from "@/lib/parkflow-data"
import { SectionTitle } from "./ui"

const BAR_COLOR: Record<string, string> = {
  high: "bg-success",
  medium: "bg-warning",
  low: "bg-danger",
}

const PCT_COLOR: Record<string, string> = {
  high: "text-success",
  medium: "text-warning-foreground",
  low: "text-danger",
}

export function AdminTab() {
  return (
    <div className="flex flex-col gap-5 px-4 py-4">
      <div>
        <h1 className="font-display text-lg font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-xs text-muted-foreground">Vista de municipios · GCBA</p>
      </div>

      <div className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="size-4 text-brand" aria-hidden="true" />
          Análisis en tiempo real
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {adminStats.map((s) => (
            <div key={s.label} className="rounded-xl bg-secondary p-3">
              <div className="font-display text-2xl font-bold text-foreground tabular-nums">{s.value}</div>
              <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle className="mb-3">Congestión por zona</SectionTitle>
        <div className="flex flex-col gap-3">
          {adminZones.map((z) => {
            const level = availabilityLevel(z.pct)
            return (
              <div key={z.name} className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{z.name}</span>
                  <span className={`text-sm font-bold tabular-nums ${PCT_COLOR[level]}`}>{z.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full rounded-full ${BAR_COLOR[level]}`} style={{ width: `${z.pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

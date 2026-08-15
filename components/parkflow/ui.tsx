import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { availabilityLevel } from "@/lib/parkflow-data"

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground", className)}>{children}</h3>
  )
}

const BADGE_STYLES: Record<string, string> = {
  high: "bg-success/15 text-success",
  medium: "bg-warning/20 text-warning-foreground",
  low: "bg-danger/15 text-danger",
}

export function AvailabilityBadge({ pct }: { pct: number }) {
  const level = availabilityLevel(pct)
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums", BADGE_STYLES[level])}>
      {pct}% disponible
    </span>
  )
}

const DOT_STYLES: Record<string, string> = {
  high: "bg-success",
  medium: "bg-warning",
  low: "bg-danger",
}

export function AvailabilityDot({ pct }: { pct: number }) {
  return <span className={cn("inline-block size-2 rounded-full", DOT_STYLES[availabilityLevel(pct)])} />
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-card px-2 py-3 text-center shadow-sm ring-1 ring-border">
      <span className="font-display text-lg font-bold text-foreground tabular-nums">{value}</span>
      <span className="mt-0.5 text-[11px] leading-tight text-muted-foreground text-balance">{label}</span>
    </div>
  )
}

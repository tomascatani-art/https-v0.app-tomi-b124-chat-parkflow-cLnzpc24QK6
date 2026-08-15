import { TrendingUp, Rabbit, Zap, Leaf, Star, type LucideIcon } from "lucide-react"
import { personalStats, achievements } from "@/lib/parkflow-data"
import { SectionTitle, StatCard } from "./ui"

const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  run: Rabbit,
  zap: Zap,
  leaf: Leaf,
  star: Star,
}

export function StatsTab() {
  return (
    <div className="flex flex-col gap-5 px-4 py-4">
      <h1 className="font-display text-lg font-bold text-foreground">Estadísticas personales</h1>

      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand/70 p-5 text-brand-foreground">
        <div className="text-xs font-medium uppercase tracking-wide opacity-80">Tu ranking</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold">#47</span>
          <span className="text-sm opacity-90">de Buenos Aires</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
          <TrendingUp className="size-4" aria-hidden="true" />
          Subiste 15 posiciones este mes
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {personalStats.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </div>

      <div>
        <SectionTitle className="mb-3">Logros desbloqueados</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a) => {
            const Icon = ACHIEVEMENT_ICONS[a.icon] ?? Star
            return (
              <div key={a.title} className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="mt-3 text-sm font-semibold text-foreground">{a.title}</div>
                <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{a.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

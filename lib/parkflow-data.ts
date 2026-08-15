export type Availability = "high" | "medium" | "low"

export function availabilityLevel(pct: number): Availability {
  if (pct >= 70) return "high"
  if (pct >= 45) return "medium"
  return "low"
}

export type Zone = {
  name: string
  lat: number
  lng: number
  availability: number
  distance: string
  price: string
  rating: number
  spots: number
}

// Center of the map (Palermo / central BA)
export const MAP_CENTER: [number, number] = [-34.58, -58.42]

export const zones: Zone[] = [
  {
    name: "Palermo",
    lat: -34.5757,
    lng: -58.419,
    availability: 89,
    distance: "1 min",
    price: "$1.50",
    rating: 4.9,
    spots: 234,
  },
  {
    name: "Palermo Viejo",
    lat: -34.5823,
    lng: -58.4267,
    availability: 65,
    distance: "4 min",
    price: "$1.00",
    rating: 4.7,
    spots: 156,
  },
  {
    name: "Barrio Parque",
    lat: -34.5702,
    lng: -58.4045,
    availability: 78,
    distance: "7 min",
    price: "$0.75",
    rating: 4.8,
    spots: 189,
  },
  {
    name: "Recoleta",
    lat: -34.5875,
    lng: -58.3934,
    availability: 52,
    distance: "8 min",
    price: "$1.75",
    rating: 4.8,
    spots: 142,
  },
  {
    name: "Belgrano",
    lat: -34.5623,
    lng: -58.4568,
    availability: 71,
    distance: "10 min",
    price: "$0.90",
    rating: 4.7,
    spots: 203,
  },
  {
    name: "Villa Crespo",
    lat: -34.5989,
    lng: -58.4383,
    availability: 47,
    distance: "11 min",
    price: "$0.60",
    rating: 4.5,
    spots: 118,
  },
  {
    name: "Palermo Chico",
    lat: -34.5889,
    lng: -58.4124,
    availability: 42,
    distance: "9 min",
    price: "$1.25",
    rating: 4.6,
    spots: 98,
  },
  {
    name: "Colegiales",
    lat: -34.5714,
    lng: -58.4489,
    availability: 63,
    distance: "12 min",
    price: "$0.70",
    rating: 4.6,
    spots: 134,
  },
  {
    name: "Chacarita",
    lat: -34.5871,
    lng: -58.4545,
    availability: 28,
    distance: "13 min",
    price: "$0.50",
    rating: 4.5,
    spots: 76,
  },
  {
    name: "Núñez",
    lat: -34.5456,
    lng: -58.4562,
    availability: 34,
    distance: "15 min",
    price: "$0.55",
    rating: 4.4,
    spots: 88,
  },
]

// Live curbside parking spots for the street view.
// occupied = has a car; free spots are the highlighted opportunities.
export type StreetSpot = { id: number; occupied: boolean; color: string }

const CAR_COLORS = ["#3b6fd4", "#1f2a44", "#c0c6d0", "#e05b3b", "#2b9d6f", "#8a5cf0", "#e0a422"]

export function streetSpots(seed = 0): StreetSpot[] {
  // Deterministic pattern so it stays stable per render batch.
  const pattern = [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1]
  return pattern.map((occupied, i) => ({
    id: i,
    occupied: occupied === 1,
    color: CAR_COLORS[(i + seed) % CAR_COLORS.length],
  }))
}

export const todayStats = [
  { value: "23", label: "Viajes hoy" },
  { value: "2m", label: "Tiempo promedio" },
  { value: "$156", label: "Ahorrados" },
]

export const favoriteZones = [
  { icon: "pin", name: "Oficina (Palermo)", visits: "Visitada 245 veces" },
  { icon: "home", name: "Casa (Chacarita)", visits: "Visitada 142 veces" },
]

export const profileStats = [
  { value: "487", label: "Total de viajes" },
  { value: "$2,340", label: "Total ahorrado" },
  { value: "4.9", label: "Puntuación" },
]

export const personalStats = [
  { value: "3.5 hrs", label: "Tiempo ahorrado" },
  { value: "287 L", label: "Combustible" },
  { value: "$2,340", label: "Dinero ahorrado" },
]

export const achievements = [
  { icon: "run", title: "Cazador Experto", desc: "100 viajes completados" },
  { icon: "zap", title: "Rápido", desc: "Menos de 1 min en búsqueda" },
  { icon: "leaf", title: "Eco Warrior", desc: "50 kg CO₂ no emitido" },
  { icon: "star", title: "5 Estrellas", desc: "Puntuación 4.9+" },
]

export type Referral = {
  name: string
  when: string
  reward: string
  trips: string
  color: string
}

export const referrals: Referral[] = [
  {
    name: "Juan Martínez",
    when: "Invitado hace 2 meses",
    reward: "+$50",
    trips: "Completó 15 viajes",
    color: "#3b6fd4",
  },
  {
    name: "Sofía García",
    when: "Invitado hace 1 mes",
    reward: "+$50",
    trips: "Completó 8 viajes",
    color: "#e05b3b",
  },
  {
    name: "Lucía Fernández",
    when: "Invitado hace 3 semanas",
    reward: "+$50",
    trips: "Completó 6 viajes",
    color: "#2b9d6f",
  },
  {
    name: "Martín Rossi",
    when: "Invitado hace 2 semanas",
    reward: "+$50",
    trips: "Completó 4 viajes",
    color: "#8a5cf0",
  },
  {
    name: "Camila Torres",
    when: "Invitado hace 5 días",
    reward: "Pendiente",
    trips: "Completó 1 viaje",
    color: "#e0a422",
  },
]

export const REFERRAL_CODE = "TOMAS2024PARK"

export const adminStats = [
  { label: "Usuarios Activos", value: "45.2k" },
  { label: "Viajes Completados Hoy", value: "12.3k" },
  { label: "Congestión Promedio", value: "67%" },
  { label: "Spots Disponibles", value: "8,234" },
]

export const adminZones = [
  { name: "Palermo", pct: 89 },
  { name: "Belgrano", pct: 71 },
  { name: "Recoleta", pct: 52 },
  { name: "Villa Crespo", pct: 47 },
  { name: "Chacarita", pct: 28 },
]

export const tripHistory = [
  {
    date: "HOY · 09:47",
    zone: "Palermo",
    detail: "Completado · 2 min búsqueda · $1.50 pagado",
  },
  {
    date: "HOY · 08:15",
    zone: "Barrio Parque",
    detail: "Completado · 3 min búsqueda · $0.75 pagado",
  },
  {
    date: "AYER · 19:30",
    zone: "Palermo Viejo",
    detail: "Completado · 5 min búsqueda · $1.00 pagado",
  },
  {
    date: "AYER · 14:22",
    zone: "Chacarita",
    detail: "Completado · 8 min búsqueda · $0.50 pagado",
  },
]

export const paymentMethods = [
  { icon: "card", name: "Visa •••• 4829", desc: "Vence 12/2026 · Principal" },
  {
    icon: "wallet",
    name: "Mercado Pago",
    desc: "Saldo: $4,500 · Pagos sin comisión",
  },
  {
    icon: "card",
    name: "American Express",
    desc: "Vence 08/2027 · +1% cashback",
  },
  {
    icon: "bank",
    name: "Transferencia Bancaria",
    desc: "Banco Nación · Débito automático",
  },
  { icon: "phone", name: "MODO", desc: "Billetera virtual argentina" },
]

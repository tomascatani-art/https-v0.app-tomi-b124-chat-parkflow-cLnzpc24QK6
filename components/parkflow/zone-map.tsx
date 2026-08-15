"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MAP_CENTER, zones, availabilityLevel } from "@/lib/parkflow-data"

const STATUS_COLOR: Record<string, string> = {
  high: "#12b981",
  medium: "#f0a422",
  low: "#ef4444",
}

function pctIcon(pct: number, color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      width:38px;height:38px;border-radius:999px;
      background:${color};color:#fff;font-weight:800;font-size:12px;
      border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);
      font-family:var(--font-sans, sans-serif);
    ">${pct}%</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  })
}

function Recenter({ target }: { target: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (target) {
      map.flyTo(target, 16, { duration: 0.8 })
    }
  }, [target, map])
  return null
}

export default function ZoneMap({
  target = null,
  onSelect,
}: {
  target?: [number, number] | null
  onSelect?: (name: string) => void
}) {
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={13}
      zoomControl={false}
      attributionControl={false}
      style={{ height: "100%", width: "100%", background: "#dbe6f0" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <Recenter target={target} />
      {zones.map((zone) => {
        const color = STATUS_COLOR[availabilityLevel(zone.availability)]
        return (
          <Marker
            key={zone.name}
            position={[zone.lat, zone.lng]}
            icon={pctIcon(zone.availability, color)}
            eventHandlers={{
              click: () => onSelect?.(zone.name),
            }}
          >
            <Tooltip direction="top" offset={[0, -18]} opacity={1}>
              <div style={{ textAlign: "center", fontWeight: 600 }}>
                {zone.name}
                <br />
                <span style={{ color, fontWeight: 700 }}>{zone.spots} spots disponibles</span>
              </div>
            </Tooltip>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

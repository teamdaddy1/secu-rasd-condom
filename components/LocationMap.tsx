'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface LocationMapProps {
  latitude: number
  longitude: number
}

declare global {
  interface Window {
    L: any
  }
}

export default function LocationMap({ latitude, longitude }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window.L === 'undefined') {
        const leafletCSS = document.createElement('link')
        leafletCSS.rel = 'stylesheet'
        leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
        document.head.appendChild(leafletCSS)

        const leafletScript = document.createElement('script')
        leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
        document.body.appendChild(leafletScript)

        await new Promise<void>((resolve) => {
          leafletScript.onload = () => resolve()
        })
      }

      if (mapRef.current && window.L) {
        // Clear existing map instance if any
        mapRef.current.innerHTML = ''

        const map = window.L.map(mapRef.current, {
          zoomControl: false,
          dragging: false,
          scrollWheelZoom: false,
          doubleClickZoom: false
        }).setView([latitude, longitude], 13)

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        const targetIcon = window.L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          shadowSize: [41, 41],
        })

        const targetMarker = window.L.marker([latitude, longitude], { icon: targetIcon }).addTo(map)
          .bindPopup('Target Location')
          .openPopup()

        // Add a pulsing circle around the target location
        const pulsingCircle = window.L.circleMarker([latitude, longitude], {
          color: '#ff0000',
          fillColor: '#ff0000',
          fillOpacity: 0.5,
          radius: 10
        }).addTo(map)

        const pulseAnimation = () => {
          let size = 10
          let growing = true
          setInterval(() => {
            if (growing) {
              size += 1
              if (size >= 20) growing = false
            } else {
              size -= 1
              if (size <= 10) growing = true
            }
            pulsingCircle.setRadius(size)
          }, 100)
        }

        pulseAnimation()

        // Fit the map to the marker bounds
        const bounds = window.L.latLngBounds([latitude, longitude])
        map.fitBounds(bounds, { padding: [50, 50] })

        setMapLoaded(true)
      }
    }

    loadLeaflet()
  }, [latitude, longitude])

  return (
    <motion.div
      className="w-full h-64 rounded-lg overflow-hidden shadow-lg relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={mapRef} className="w-full h-full" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-red-500">
          Loading map...
        </div>
      )}
    </motion.div>
  )
}


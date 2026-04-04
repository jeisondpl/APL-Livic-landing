'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Leaflet with Next.js
// We use CDN links for the default icons to avoid path resolution issues during build
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface InteractiveMapProps {
  longitude: number
  latitude: number
  name?: string
}

export default function LeafletMapContent({ longitude, latitude, name }: InteractiveMapProps) {
  return (
    <div className='w-full h-full bg-[#1a1a1a] rounded-xl overflow-hidden border border-surface-300 relative'>
      <MapContainer center={[latitude, longitude]} zoom={17} scrollWheelZoom={true} style={{ height: '100%', width: '100%', background: '#1a1a1a' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>
            <div className='text-livic-black font-sans'>
              <strong>{name || 'LIVIC'}</strong>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Indicador de ayuda */}
      <div className='absolute bottom-2 right-2 bg-livic-black/60 px-2 py-1 rounded text-[10px] text-text-muted backdrop-blur-sm pointer-events-none z-[1000]'>
        Usa la rueda del ratón para zoom
      </div>
    </div>
  )
}

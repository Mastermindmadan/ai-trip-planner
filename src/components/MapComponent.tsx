import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../types';

// Fix for default marker icons in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
  locations: Location[];
  startLocation?: string;
  destination: string;
}

export default function MapComponent({ locations, startLocation, destination }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([20, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;
    
    // Clear old markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    if (locations.length > 0) {
      const markers = locations.map(loc => {
        return L.marker([loc.lat, loc.lng])
          .bindPopup(`<b>${loc.name}</b><br/>${loc.description || ''}`)
          .addTo(map);
      });

      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));

      // Draw line if multiple points
      if (locations.length > 1) {
        const coords = locations.map(l => [l.lat, l.lng] as [number, number]);
        L.polyline(coords, { color: '#2563eb', weight: 3, dashArray: '10, 10' }).addTo(map);
      }
    }

    return () => {
      // We don't necessarily want to destroy the map on re-render, 
      // but we do want to clean it up if component unmounts
    };
  }, [locations]);

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

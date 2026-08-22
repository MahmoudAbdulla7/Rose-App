'use client';

import type { LatLngLiteral } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { MapPinHouse } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';

interface AddressMapProps {
  location: LatLngLiteral | null;
  onLocationChange: (location: LatLngLiteral) => void;
}

function MapEvents({ onLocationChange }: AddressMapProps) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });

  return null;
}

function ChangeView({ location }: { location: LatLngLiteral | null }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, map.getZoom());
    }
  }, [location, map]);

  return null;
}

export default function AddressMap({ location, onLocationChange }: AddressMapProps) {
  // Translation
  const t = useTranslations('address');

  // State
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Variables
  const defaultCenter = location ?? {
    lat: 30.0444,
    lng: 31.2357, // Cairo
  };

  // Functions
  const handleFindMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported.');
      return;
    }

    setIsLocating(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onLocationChange({
          lat: coords.latitude,
          lng: coords.longitude,
        });

        setIsLocating(false);
      },
      () => {
        setLocationError('locationDenied');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  return (
    <>
      <div className="relative h-72 w-full overflow-hidden rounded-lg">
        <MapContainer center={defaultCenter} zoom={13} className="h-full w-full rounded-xl">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapEvents location={location} onLocationChange={onLocationChange} />

          <ChangeView location={location} />

          {location && (
            <Marker
              draggable
              position={location}
              eventHandlers={{
                dragend(event) {
                  onLocationChange(event.target.getLatLng());
                },
              }}
            />
          )}
        </MapContainer>
        <Button
          type="button"
          variant="outline"
          className="absolute inset-e-3 top-3 z-1000 flex gap-2.5"
          onClick={handleFindMyLocation}
          loading={isLocating}
        >
          <MapPinHouse />
          {t('form.findMyLocation')}
        </Button>
      </div>
      {locationError && <p className="text-ds-danger mt-2 text-sm">{locationError}</p>}
    </>
  );
}

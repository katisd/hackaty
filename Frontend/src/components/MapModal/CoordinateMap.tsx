import React, { useEffect, useRef, useState } from 'react';
// import ReactDOM from 'react-dom';
import { CoordinateProps } from '../../interface/interface';

const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
const CoordinateMap = ({
  setIsModel,
  setSelectedCoor,
}: {
  setIsModel: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCoor: React.Dispatch<React.SetStateAction<CoordinateProps | null>>;
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [currentLocation, setCurrentLocation] = useState<CoordinateProps | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  console.log('current : ', currentLocation);
  useEffect(() => {
    if (!mapRef.current || !currentLocation) return;
    const my_map = new Map(mapRef.current, {
      zoom: 19,
      center: currentLocation,
      mapId: 'DEMO_MAP_ID',
    });
    new google.maps.Marker({
      position: currentLocation,
      map: my_map,
      title: 'ME',
    });

    my_map.addListener('click', (mapsMouseEvent: any) => {
      setSelectedCoor({
        lat: mapsMouseEvent.latLng.lat(),
        lng: mapsMouseEvent.latLng.lng(),
      });
      setIsModel(false);
      //
    });
  }, [currentLocation]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '77vh', display: 'flex', justifyContent: 'center', margin: '0 auto' }}
    />
  );
};

export default CoordinateMap;

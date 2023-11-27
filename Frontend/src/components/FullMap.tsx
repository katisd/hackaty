import React, { useEffect, useRef } from 'react';
import { CoordinateProps, MapDataLocationProps } from '../interface/interface';
import './FullMap.css';
const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

function toggleHighlight(markerView: any) {
  if (markerView.content.classList.contains('highlight')) {
    markerView.content.classList.remove('highlight');
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add('highlight');
    markerView.zIndex = 1;
  }
}

function buildContent(data: MapDataLocationProps) {
  const content = document.createElement('div');
  content.classList.add('property');
  content.innerHTML = `
    <div class="icon">
    
  </div>
  <div class="details">
    <div class="price">${data.description}</div>
    <div class="address">${data._id}</div>
    <div class="features">
      <div>
        <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
        <span class="fa-sr-only">Status</span>
        <span>${data.report_status}</span>
      </div>
      <div>
        <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
        <span class="fa-sr-only">Priority</span>
        <span>${data.priority}</span>
      </div>
      <div>
        <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
        <span class="fa-sr-only">vote_score</span>
        <span>${data.vote_score} ft<sup>2</sup></span>
      </div>
    </div>
  </div>
`;

  return content;
}
const FullMap = ({
  location,
  setSelected,
  mapData,
  isStatus,
}: {
  location: CoordinateProps;
  setSelected: React.Dispatch<React.SetStateAction<MapDataLocationProps | null>>;
  mapData: MapDataLocationProps[];
  isStatus: boolean;
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      if (!mapRef.current) return;
      const initializedMap = new Map(mapRef.current, {
        zoom: 18,
        center: location,
        mapId: 'DEMO_MAP_ID',
      });

      new AdvancedMarkerElement({
        map: initializedMap,
        position: location,
        title: 'ME',
      });
      // marker
      mapData?.map((data) => {
        const marker = new AdvancedMarkerElement({
          map: initializedMap,
          position: { lat: data.lat, lng: data.lon },
          title: data.description,
          content: buildContent(data),
        });

        // Add a click listener to each marker instance
        marker.addListener('click', () => {
          {
            isStatus ? toggleHighlight(marker) : null;
          }
          setSelected(data);
        });
      });
    };
    loadMap();
  }, [mapData]);
  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '77vh', display: 'flex', justifyContent: 'center', margin: '0 auto' }}
    />
  );
};

export default FullMap;

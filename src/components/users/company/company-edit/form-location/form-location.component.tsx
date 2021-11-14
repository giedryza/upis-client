import { VFC } from 'react';

import { ComponentProps } from './form-location.types';
import { usePoint } from './form-location.hooks';

import { Map, mapIcon } from 'ui/map';
import { MapDragendEvent } from 'ui/map/map-search/map-search.types';

export const Location: VFC<ComponentProps> = () => {
  const { point, updatePoint } = usePoint();

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Map center={{ lat: point.lat, lng: point.lng }} zoom={7}>
        {({
          leaflet: { icon },
          reactLeaflet: { Marker, useMap },
          custom: { SearchBar },
        }) => (
          <>
            <SearchBar useMap={useMap} onChange={updatePoint} />

            <Marker
              draggable
              position={{ lat: point.lat, lng: point.lng }}
              icon={icon(mapIcon({ name: 'pin', size: 48 }))}
              eventHandlers={{
                dragend: (e) => {
                  const { target } = e as MapDragendEvent;
                  updatePoint({
                    lat: target._latlng.lat,
                    lng: target._latlng.lng,
                  });
                },
              }}
            />
          </>
        )}
      </Map>
    </div>
  );
};

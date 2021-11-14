import { VFC } from 'react';

import { ComponentProps } from './location.types';

import { Map, mapIcon } from 'ui/map';

const center = {
  lat: 55.0,
  lng: 24.5,
};

export const Location: VFC<ComponentProps> = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Map center={center} zoom={7}>
        {({ ReactLeaflet: { Marker, Popup }, L: { icon } }) => (
          <>
            <Marker
              draggable
              position={center}
              icon={icon(mapIcon({ name: 'pin', size: 48 }))}
              eventHandlers={{
                dragend: (e) => console.log(e),
              }}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </>
        )}
      </Map>
    </div>
  );
};

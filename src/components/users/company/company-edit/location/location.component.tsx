import { VFC } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapContainerProps,
} from 'react-leaflet';
import { icon } from 'leaflet';

import { ComponentProps } from './location.types';

const center = {
  lat: 55.0,
  lng: 24.5,
};

const iconSize = 48;

const ICON = icon({
  iconUrl: '/map/icons/pin.svg',
  iconSize: [iconSize, iconSize],
  iconAnchor: [iconSize / 2, iconSize],
  popupAnchor: [0, -iconSize],
});

const DraggableMarker = () => {
  return (
    <Marker
      draggable
      position={center}
      icon={ICON}
      eventHandlers={{
        dragend: (e) => console.log(e),
      }}
    >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

const mapContainerProps: MapContainerProps = {
  center,
  zoom: 7,
  style: { height: 400, width: '100%' },
};

const Location: VFC<ComponentProps> = () => {
  return (
    <MapContainer {...mapContainerProps}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </MapContainer>
  );
};

export default Location;

import { FC } from 'react';
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet';

const MapWrapper: FC = ({ children }) => {
  return (
    <MapContainer>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div>labas</div>
    </MapContainer>
  );
};

export default MapWrapper;

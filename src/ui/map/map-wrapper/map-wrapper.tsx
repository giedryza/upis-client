import { ConsumerProps } from 'react';
import * as L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { MapSearch } from '../map-search/map-search';

import styles from './map-wrapper.module.scss';

type Props = ConsumerProps<{
  reactLeaflet: typeof ReactLeaflet;
  leaflet: typeof L;
  custom: { SearchBar: typeof MapSearch };
}> &
  Omit<ReactLeaflet.MapContainerProps, 'children'>;

const MapWrapper = ({ children, ...rest }: Props) => {
  return (
    <ReactLeaflet.MapContainer
      {...rest}
      className={styles.mapContainer}
      worldCopyJump
      minZoom={3}
    >
      <ReactLeaflet.TileLayer
        attribution='&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children({
        leaflet: L,
        reactLeaflet: ReactLeaflet,
        custom: { SearchBar: MapSearch },
      })}
    </ReactLeaflet.MapContainer>
  );
};

export default MapWrapper;

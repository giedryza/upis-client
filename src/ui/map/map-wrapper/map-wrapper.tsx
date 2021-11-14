import { ConsumerProps } from 'react';
import * as L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import styles from './map-wrapper.module.scss';

import { MapSearch } from 'ui/map/map-search/map-search';

type Props = ConsumerProps<{
  reactLeaflet: typeof ReactLeaflet;
  leaflet: typeof L;
  custom: { SearchBar: typeof MapSearch };
}> &
  ReactLeaflet.MapContainerProps;

const MapWrapper = ({ children, ...rest }: Props) => {
  return (
    <ReactLeaflet.MapContainer {...rest} className={styles.mapContainer}>
      <ReactLeaflet.TileLayer
        attribution='&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
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

import { ConsumerProps } from 'react';
import * as L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { APP } from 'config';

import { MapSearch } from '../map-search/map-search';
import { ContextMenu } from '../context-menu';

import styles from './map-wrapper.module.scss';

type Props = ConsumerProps<{
  reactLeaflet: typeof ReactLeaflet;
  leaflet: typeof L;
  custom: { SearchBar: typeof MapSearch; ContextMenu: typeof ContextMenu };
}> &
  Omit<ReactLeaflet.MapContainerProps, 'children'>;

const MapWrapper = ({ children, ...rest }: Props) => {
  return (
    <ReactLeaflet.MapContainer
      {...rest}
      className={styles.mapContainer}
      style={{ '--spacing': APP.serp.gridGap }}
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
        custom: { SearchBar: MapSearch, ContextMenu },
      })}
    </ReactLeaflet.MapContainer>
  );
};

export default MapWrapper;

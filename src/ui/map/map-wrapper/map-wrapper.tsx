import { ConsumerProps } from 'react';
import * as L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './map-wrapper.module.scss';

type Props = ConsumerProps<{ ReactLeaflet: typeof ReactLeaflet; L: typeof L }> &
  ReactLeaflet.MapContainerProps;

const MapWrapper = ({ children, ...rest }: Props) => {
  return (
    <ReactLeaflet.MapContainer {...rest} className={styles.mapContainer}>
      <ReactLeaflet.TileLayer
        attribution='&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children({ ReactLeaflet, L })}
    </ReactLeaflet.MapContainer>
  );
};

export default MapWrapper;

import { IconOptions } from 'leaflet';

type MapIconName = 'pin' | 'circle' | 'circle-dot';

interface Options {
  size: number;
  name: MapIconName;
}

export const mapIcon = ({ size, name }: Options): IconOptions => ({
  iconUrl: `/map/icons/${name}.svg`,
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

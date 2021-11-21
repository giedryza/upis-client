import { IconOptions } from 'leaflet';

interface Options {
  size: number;
  name: MapIconName;
}

export type MapIconName = 'pin';

const ICONS_PATH = '/map/icons/';

export const MAP_ICON_BY_NAME: Record<MapIconName, string> = {
  pin: 'pin.svg',
};

export const mapIcon = ({ size, name }: Options): IconOptions => ({
  iconUrl: `${ICONS_PATH}${MAP_ICON_BY_NAME[name]}`,
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

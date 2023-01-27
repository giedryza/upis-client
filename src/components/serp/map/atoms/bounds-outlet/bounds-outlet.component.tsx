import { FC, useEffect } from 'react';

import { Props } from './bounds-outlet.types';

export const BoundsOutlet: FC<Props> = ({
  useMap,
  useMapEvents,
  coordinates,
}) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length) {
      map.fitBounds(coordinates);
    }
  }, [coordinates, map]);

  useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      console.log([northEast.lat, northEast.lng, southWest.lat, southWest.lng]);
    },
  });

  return null;
};

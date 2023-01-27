import { FC, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useQueryNavigation } from 'tools/hooks';

import { Props } from './bounds-outlet.types';

export const BoundsOutlet: FC<Props> = ({
  useMap,
  useMapEvents,
  coordinates,
  updateOnMapMove,
}) => {
  const map = useMap();
  const { navigateWithQuery } = useQueryNavigation();

  useEffect(() => {
    if (coordinates.length) {
      map.fitBounds(coordinates);
    }
  }, [coordinates, map]);

  const setBounds = () => {
    const bounds = map.getBounds();
    const [north, east, south, west] = [
      bounds.getNorth(),
      bounds.getEast(),
      bounds.getSouth(),
      bounds.getWest(),
    ];

    navigateWithQuery({
      bounds: [north, east, south, west],
    });
  };

  const debouncedSetBounds = useDebouncedCallback(setBounds, 100);

  useMapEvents({
    moveend: () => {
      if (updateOnMapMove) {
        debouncedSetBounds();
      }
    },
  });

  return null;
};

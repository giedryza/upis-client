import { FC, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useQueryNavigation } from 'tools/hooks';
import { useToursActiveFilters } from 'domain/tours';

import { Props } from './bounds-outlet.types';

export const BoundsOutlet: FC<Props> = ({
  useMap,
  useMapEvents,
  coordinates,
  updateOnMapMove,
}) => {
  const map = useMap();
  const { navigateWithQuery } = useQueryNavigation();

  const isInitialLoad = useRef(true);

  const { data: filters, isPreviousData } = useToursActiveFilters();

  useEffect(() => {
    if (!coordinates.length) {
      return;
    }

    if (isInitialLoad.current) {
      map.fitBounds(coordinates);
      isInitialLoad.current = false;

      return;
    }

    if (!filters?.bounds && !isPreviousData) {
      map.fitBounds(coordinates, { animate: false });
    }
  }, [map, coordinates, filters?.bounds, isPreviousData]);

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

  const debouncedSetBounds = useDebouncedCallback(setBounds, 200);

  useMapEvents({
    dragend: () => {
      if (updateOnMapMove) {
        debouncedSetBounds();
      }
    },
    zoomend: () => {
      if (updateOnMapMove) {
        debouncedSetBounds();
      }
    },
  });

  return null;
};

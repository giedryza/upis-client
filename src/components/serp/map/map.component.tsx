import { FC, useMemo, useState } from 'react';

import { DEFAULT_CENTER, Map, mapIcon } from 'ui';
import { Infobox } from 'components/serp';
import { useInfiniteTours, useToursFilters } from 'domain/tours';
import { useAppSelector } from 'tools/services';
import { selectSerpState } from 'domain/serp';

import { BoundsOutlet, UpdatesControl } from './atoms';
import styles from './map.module.scss';

export const SerpMap: FC = () => {
  const [activeInfobox, setActiveInfobox] = useState('');
  const [updateOnMapMove, setUpdateOnMapMove] = useState(true);

  const { active } = useAppSelector(selectSerpState);

  const filters = useToursFilters();
  const { data } = useInfiniteTours(filters);

  const tours = useMemo(
    () =>
      data
        ? data.pages
            .flat()
            .filter(
              (tour) =>
                tour.departure.coordinates[0] && tour.departure.coordinates[1]
            )
        : [],
    [data]
  );

  const bounds = useMemo<Array<[number, number]>>(() => {
    return tours.map((tour) => [
      tour.departure.coordinates[1] || 0,
      tour.departure.coordinates[0] || 0,
    ]);
  }, [tours]);

  return (
    <section className={styles.map}>
      <Map
        center={{ lat: DEFAULT_CENTER.lat, lng: DEFAULT_CENTER.lng }}
        zoom={10}
      >
        {({
          leaflet: { icon, point },
          reactLeaflet: { Marker, Popup, useMap, useMapEvents },
        }) => (
          <>
            <BoundsOutlet
              useMap={useMap}
              useMapEvents={useMapEvents}
              coordinates={bounds}
              updateOnMapMove={updateOnMapMove}
            />

            <UpdatesControl
              updateOnMapMove={updateOnMapMove}
              onChange={setUpdateOnMapMove}
            />

            {tours.map((tour) => {
              const [lng = 0, lat = 0] = tour.departure.coordinates;

              return (
                <Marker
                  position={{ lat, lng }}
                  icon={icon(
                    mapIcon({
                      name: tour._id === active ? 'circle-dot' : 'circle',
                      size: 24,
                    })
                  )}
                  eventHandlers={{
                    popupopen: () => setActiveInfobox(tour._id),
                    popupclose: () => setActiveInfobox(''),
                  }}
                  key={tour._id}
                  zIndexOffset={tour._id === active ? 1000 : 0}
                >
                  <Popup closeButton={false} offset={point(0, 15)}>
                    {activeInfobox === tour._id ? (
                      <Infobox
                        useMap={useMap}
                        _id={tour._id}
                        slug={tour.slug}
                        name={tour.name}
                        photos={tour.photos}
                        distance={tour.distance}
                        days={tour.days}
                        duration={tour.duration}
                        price={tour.price}
                      />
                    ) : null}
                  </Popup>
                </Marker>
              );
            })}
          </>
        )}
      </Map>
    </section>
  );
};

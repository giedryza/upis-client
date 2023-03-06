import { FC } from 'react';

import { useActiveTour } from 'domain/tours';

import {
  BodyAmenities,
  BodyDescription,
  BodyGallery,
  BodyLocation,
  BodyOverview,
  BodyPrices,
  BodyTours,
  Provider,
} from './atoms';
import styles from './body.module.scss';

export const DetailsBody: FC = () => {
  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <div className={styles.body}>
      <BodyGallery photos={tour.photos} />

      <section className={styles.provider}>
        <Provider placement="section" />
      </section>

      <BodyDescription description={tour.description ?? ''} />

      <BodyOverview
        regions={tour.regions}
        rivers={tour.rivers}
        difficulty={tour.difficulty}
        days={tour.days}
        distance={tour.distance ?? NaN}
        duration={tour.duration ?? NaN}
        boats={tour.provider.boats}
      />

      <BodyPrices price={tour.price} />

      <BodyLocation
        arrival={tour.arrival ?? { coordinates: [] }}
        departure={tour.departure ?? { coordinates: [] }}
      />

      <BodyAmenities amenities={tour.amenities.map((amenity) => amenity._id)} />

      <BodyTours id={tour.provider._id} />
    </div>
  );
};

import { FC } from 'react';

import { useActiveTour } from 'domain/tours';

import {
  BodyAmenities,
  BodyDescription,
  BodyGallery,
  BodyLocation,
  BodyOverview,
  BodyPrices,
} from './atoms';
import styles from './body.module.scss';

export const DetailsBody: FC = () => {
  const { data: tour } = useActiveTour();

  return (
    <div className={styles.body}>
      <BodyGallery photos={tour?.photos ?? []} />

      <BodyDescription description={tour?.description ?? ''} />

      <BodyOverview
        regions={tour?.regions ?? []}
        rivers={tour?.rivers ?? []}
        difficulty={tour?.difficulty ?? NaN}
        days={tour?.days ?? NaN}
        distance={tour?.distance ?? NaN}
        duration={tour?.duration ?? NaN}
        boats={tour?.provider.boats ?? []}
      />

      <BodyPrices price={tour?.price ?? null} />

      <BodyLocation
        arrival={tour?.arrival ?? { coordinates: [] }}
        departure={tour?.departure ?? { coordinates: [] }}
      />

      <BodyAmenities
        amenities={tour?.amenities.map((amenity) => amenity._id) ?? []}
      />
    </div>
  );
};

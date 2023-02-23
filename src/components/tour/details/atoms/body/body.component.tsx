import { FC } from 'react';

import { useActiveTour } from 'domain/tours';

import { BodyDescription, BodyGallery, BodyOverview } from './atoms';
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
    </div>
  );
};

import { FC } from 'react';

import { useActiveTour } from 'domain/tours';

import { BodyDescription, BodyGallery } from './atoms';
import styles from './body.module.scss';

export const DetailsBody: FC = () => {
  const { data: tour } = useActiveTour();

  return (
    <div className={styles.body}>
      <BodyGallery photos={tour?.photos ?? []} />

      <BodyDescription description={tour?.description ?? ''} />
    </div>
  );
};

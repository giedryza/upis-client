import { FC } from 'react';

import { Carousel, ImagePlaceholder } from 'ui';
import { useActiveTour } from 'domain/tours';
import { generateImageUrl } from 'tools/common';

import styles from './body.module.scss';

export const DetailsBody: FC = () => {
  const { data: tour } = useActiveTour();

  return (
    <section className={styles.section}>
      <div className={styles.gallery}>
        {tour?.photos.length ? (
          <Carousel
            images={
              tour.photos.map((photo) => ({
                id: photo._id,
                url: photo.url,
                alt: photo.description,
                placeholder: generateImageUrl({
                  id: photo.key,
                  width: 16,
                  height: 9,
                }),
              })) ?? []
            }
            sizes={{
              xs: 576,
              sm: 768,
              md: 680,
              lg: 825,
              default: 825,
            }}
            options={{ behavior: 'auto' }}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
    </section>
  );
};

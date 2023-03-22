import { FC } from 'react';

import { Carousel, ImagePlaceholder } from 'ui';
import { generateImageUrl } from 'tools/services';

import { Props } from './gallery.types';
import styles from './gallery.module.scss';

export const BodyGallery: FC<Props> = ({ photos }) => {
  return (
    <section className={styles.gallery}>
      {photos.length ? (
        <Carousel
          images={
            photos.map((photo) => ({
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
    </section>
  );
};

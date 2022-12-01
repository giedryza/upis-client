import { FC, useState } from 'react';
import NextImage, { ImageProps } from 'next/image';

import { breakpoints } from 'types/common';
import { APP } from 'config/app';

import { Props } from './image.types';
import styles from './image.module.scss';

export const Image: FC<
  Props &
    Omit<
      ImageProps,
      | 'width'
      | 'height'
      | 'fill'
      | 'sizes'
      | 'placeholder'
      | 'onLoadingComplete'
    >
> = ({ sizes, placeholder = '', ...imageProps }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>
      <NextImage
        {...imageProps}
        onLoadingComplete={() => setIsLoading(false)}
        {...('width' in sizes
          ? { width: sizes.width, height: sizes.height }
          : {
              fill: true,
              sizes: [
                ...breakpoints.map(
                  (breakpoint) =>
                    `(max-width: ${APP.breakpoints[breakpoint]}px) ${sizes[breakpoint]}px`
                ),
                `${sizes.default}px`,
              ].join(', '),
            })}
      />

      {isLoading && !!placeholder ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={placeholder}
          alt={imageProps.alt}
          className={styles.placeholder}
        />
      ) : null}
    </div>
  );
};

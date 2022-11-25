import { FC } from 'react';
import NextImage, { ImageProps } from 'next/image';

import { breakpoints } from 'types/common';
import { APP } from 'config/app';

import { Props } from './image.types';

export const Image: FC<
  Props & Omit<ImageProps, 'width' | 'height' | 'fill' | 'sizes'>
> = ({ sizes, ...imageProps }) => {
  return (
    <NextImage
      {...imageProps}
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
  );
};

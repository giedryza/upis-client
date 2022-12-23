import { Breakpoint } from 'types/common';
import styles from 'styles/utils/export.module.scss';

export const APP = {
  serp: {
    carouselAspectRatio: [4, 3],
    cardHeight: 200,
    gridGap: 15,
  },
  scss: styles,
  breakpoints: {
    xs: Number(styles.xsBreakpoint),
    sm: Number(styles.smBreakpoint),
    md: Number(styles.mdBreakpoint),
    lg: Number(styles.lgBreakpoint),
  } satisfies Record<Breakpoint, number>,
  cloudinary: {
    //    https://res.cloudinary.com/upis/image/upload/w_200,h_150,c_fill/upis/development/e96c5cad-bfda-4409-888b-7135a1b82336.avif
    url: 'https://res.cloudinary.com/:cloud_name/:asset_type/:delivery_type/:transformations/:public_id'
      .replace(':cloud_name', 'upis')
      .replace(':asset_type', 'image')
      .replace(':delivery_type', 'upload'),
  },
} as const;

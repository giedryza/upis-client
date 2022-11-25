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
    url: 'https://res.cloudinary.com/:cloud_name/:asset_type/:delivery_type/:transformations/:public_id.:extension'
      .replace(':cloud_name', 'upis')
      .replace(':asset_type', 'image')
      .replace(':delivery_type', 'upload'),
  },
} as const;

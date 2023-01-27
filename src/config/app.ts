import { Breakpoint } from 'types/common';
import styles from 'styles/utils/export.module.scss';

const SERP_CONFIG = {
  cardImageAspectRatio: [4, 3],
  cardHeight: 200,
  infoboxImageAspectRatio: [4, 3],
  infoboxHeight: 150,
} as const;

export const APP = {
  env: process.env.NODE_ENV,
  host: {
    client: process.env.NEXT_PUBLIC_HOST_CLIENT,
    api: process.env.NEXT_PUBLIC_HOST_API,
  },
  serp: {
    list: {
      placeholdersCount: 6,
    },
    card: {
      image: {
        aspectRatio: SERP_CONFIG.cardImageAspectRatio,
        height: SERP_CONFIG.cardHeight,
        width: Math.round(
          (SERP_CONFIG.cardHeight * SERP_CONFIG.cardImageAspectRatio[0]) /
            SERP_CONFIG.cardImageAspectRatio[1]
        ),
      },
    },
    infobox: {
      image: {
        aspectRatio: SERP_CONFIG.infoboxImageAspectRatio,
        height: SERP_CONFIG.infoboxHeight,
        width: Math.round(
          (SERP_CONFIG.infoboxHeight * SERP_CONFIG.infoboxImageAspectRatio[0]) /
            SERP_CONFIG.infoboxImageAspectRatio[1]
        ),
      },
    },
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

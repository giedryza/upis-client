// import { Breakpoint } from 'types/common';
import styles from 'styles/utils/export.module.scss';
import { Locale } from 'types/common';

const SERP_CONFIG = {
  cardImageAspectRatio: [4, 3],
  cardHeight: 200,
  infoboxImageAspectRatio: [4, 3],
  infoboxHeight: 150,
} as const;

export const APP = {
  name: 'Upis.lt',
  mail: {
    index: 'info@upis.lt',
  },
  env: process.env.NODE_ENV,
  host: {
    client: process.env.NEXT_PUBLIC_HOST_CLIENT,
    api: process.env.NEXT_PUBLIC_HOST_API,
  },
  locales: {
    default: Locale.Lt,
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
        quality: 3,
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
        quality: 3,
      },
    },
    gridGap: 15,
  },
  scss: styles,
  fontSize: Number(styles.fontSize),
  breakpoints: {
    xs: Number(styles.xsBreakpoint),
    sm: Number(styles.smBreakpoint),
    md: Number(styles.mdBreakpoint),
    lg: Number(styles.lgBreakpoint),
    // TODO when storybook 7 launches, replace with: } satisfies Record<Breakpoint, number>,
    // https://github.com/storybookjs/storybook/issues/21027
  },
  cloudinary: {
    cloudName: 'upis',
  },
  google: {
    measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID,
  },
} as const;

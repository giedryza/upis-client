export const APP = {
  serp: {
    carouselAspectRatio: [4, 3],
    cardHeight: 200,
    gridGap: 15,
  },
  cloudinary: {
    url: 'https://res.cloudinary.com/:cloud_name/:asset_type/:delivery_type/:transformations/:public_id.:extension'
      .replace(':cloud_name', 'upis')
      .replace(':asset_type', 'image')
      .replace(':delivery_type', 'upload'),
  },
} as const;

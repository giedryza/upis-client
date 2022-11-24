export const endpoints = {
  users: {
    signup: 'users/signup',
    signin: 'users/signin',
    me: 'users/me',
    password: {
      update: 'users/update-password',
      forgot: 'users/forgot-password',
      reset: 'users/reset-password',
    },
  },
  providers: {
    index: 'providers',
    one: {
      index: 'providers/:id',
      logo: 'providers/:id/logo',
    },
  },
  tours: {
    index: 'tours',
    one: {
      index: 'tours/:id',
      price: 'tours/:id/price',
      geography: 'tours/:id/geography',
      amenities: 'tours/:id/amenities',
      photo: 'tours/:id/photo',
    },
  },
  socialLinks: {
    index: 'social-links',
    one: 'social-links/:id',
  },
  amenities: {
    index: 'amenities',
    one: 'amenities/:id',
  },
  images: {
    one: 'images/:id',
  },
} as const;

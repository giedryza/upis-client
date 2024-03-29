export const endpoints = {
  users: {
    signup: 'users/signup',
    signin: {
      credentials: 'users/signin',
      token: 'users/signin-with-token',
      google: 'users/signin-with-google',
    },
    me: 'users/me',
    password: {
      update: 'users/update-password',
      forgot: 'users/forgot-password',
      reset: 'users/reset-password',
    },
    email: {
      sendVerifyEmail: 'users/send-verify-email',
      verify: 'users/verify-email',
    },
    role: 'users/become-provider',
  },
  providers: {
    index: 'providers',
    one: {
      index: 'providers/:id',
      logo: 'providers/:id/logo',
      socials: 'providers/:id/socials',
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
    filters: 'tours/filters',
  },
  amenities: {
    index: 'amenities',
    one: 'amenities/:id',
  },
  images: {
    one: 'images/:id',
  },
} as const;

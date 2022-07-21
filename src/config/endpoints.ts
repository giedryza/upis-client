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
  companies: {
    index: 'companies',
    one: {
      index: 'companies/:id',
      logo: 'companies/:id/logo',
    },
  },
  tours: {
    index: 'tours',
    one: {
      index: 'tours/:id',
      price: 'tours/:id/price',
    },
  },
  socialLinks: {
    index: 'social-links',
    one: 'social-links/:id',
  },
};

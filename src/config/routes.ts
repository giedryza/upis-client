export const routes = {
  home: '/',
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
  },
  account: {
    profile: {
      index: '/account/profile',
      security: '/account/profile/security',
    },
    companies: {
      index: '/account/companies',
      one: {
        index: '/account/companies/:slug',
        about: '/account/companies/:slug/about',
      },
    },
    tours: {
      index: '/account/tours',
    },
  },
  companies: {
    list: '/companies',
  },
};

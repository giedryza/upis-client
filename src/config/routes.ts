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
      one: '/account/companies/:slug',
    },
    tours: {
      index: '/account/tours',
    },
  },
  companies: {
    list: '/companies',
  },
};

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
        contacts: '/account/companies/:slug/contacts',
        location: '/account/companies/:slug/location',
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

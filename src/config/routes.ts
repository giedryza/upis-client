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
      create: '/account/companies/create',
      one: {
        index: '/account/companies/:slug',
        about: '/account/companies/:slug/about',
        contacts: '/account/companies/:slug/contacts',
        location: '/account/companies/:slug/location',
        logo: '/account/companies/:slug/logo',
        socialLinks: {
          add: '/account/companies/:slug/social-links/add',
          one: '/account/companies/:slug/social-links/:id',
        },
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

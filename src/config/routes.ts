export const routes = {
  home: '/',
  redirect: '/redirect',
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    passwordReset: '/auth/password-reset',
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
};

export const routes = {
  home: '/',
  redirect: '/redirect',
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    password: {
      forgot: '/auth/password/forgot',
      reset: '/auth/password/reset',
    },
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
        index: '/account/companies/:id',
        about: '/account/companies/:id/about',
        contacts: '/account/companies/:id/contacts',
        location: '/account/companies/:id/location',
        logo: '/account/companies/:id/logo',
        socialLinks: {
          add: '/account/companies/:id/social-links/add',
          one: '/account/companies/:id/social-links/:socialLinkId',
        },
        amenities: {
          add: '/account/companies/:id/amenities/add',
          one: '/account/companies/:id/amenities/:amenityId',
        },
      },
    },
    tours: {
      index: '/account/tours',
      create: '/account/tours/create',
      one: {
        index: '/account/tours/:id',
        about: '/account/tours/:id/about',
        details: '/account/tours/:id/details',
        prices: '/account/tours/:id/prices',
        location: '/account/tours/:id/location',
        geography: '/account/tours/:id/geography',
        gallery: '/account/tours/:id/gallery',
        amenities: '/account/tours/:id/amenities',
      },
    },
  },
};

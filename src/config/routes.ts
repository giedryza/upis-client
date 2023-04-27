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
    email: {
      verify: '/auth/email/verify',
    },
  },
  account: {
    profile: {
      index: '/account/profile',
      security: '/account/profile/security',
    },
    providers: {
      index: '/account/providers',
      create: '/account/providers/create',
      one: {
        index: '/account/providers/:id',
        about: '/account/providers/:id/about',
        contacts: '/account/providers/:id/contacts',
        location: '/account/providers/:id/location',
        logo: '/account/providers/:id/logo',
        socials: {
          add: '/account/providers/:id/socials/add',
          one: '/account/providers/:id/socials/:socialId',
        },
        amenities: {
          add: '/account/providers/:id/amenities/add',
          one: '/account/providers/:id/amenities/:amenityId',
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
        gallery: {
          add: '/account/tours/:id/gallery/add',
          one: '/account/tours/:id/gallery/:imageId',
        },
        amenities: '/account/tours/:id/amenities',
      },
    },
  },
  tours: {
    one: {
      index: '/tours/:id/:slug',
    },
  },
} as const;

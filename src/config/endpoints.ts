export const endpoints = {
  users: {
    signup: 'users/signup',
    signin: 'users/signin',
    signout: 'users/signout',
    me: 'users/me',
  },
  companies: {
    index: 'companies',
    me: 'companies/me',
    one: 'companies/:id',
  },
  socialLinks: {
    index: 'social-links',
    one: 'social-links/:id',
  },
};

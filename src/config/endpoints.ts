export const endpoints = {
  users: {
    signup: 'users/signup',
    signin: 'users/signin',
    me: 'users/me',
    updatePassword: 'users/update-password',
  },
  companies: {
    index: 'companies',
    one: 'companies/:id',
  },
  socialLinks: {
    index: 'social-links',
    one: 'social-links/:id',
  },
};

const paths = {
  companies: 'companies',
  users: 'users',
};

export const routes = {
  home: '/',
  users: {
    signup: `/${paths.users}/signup`,
    signin: `/${paths.users}/signin`,
    profile: `/${paths.users}/profile`,
  },
  companies: {
    list: `/${paths.companies}`,
  },
};

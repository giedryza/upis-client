import { config } from 'uri/config';

const paths = {
  companies: 'companies',
  users: 'users',
};

export const endpoints = {
  baseUrl: `${config.root}/${config.version}`,
  users: {
    signup: `${paths.users}/signup`,
    signin: `${paths.users}/signin`,
    signout: `${paths.users}/signout`,
    me: `${paths.users}/me`,
  },
  companies: {
    collection: paths.companies,
    document: `${paths.companies}/:id`,
  },
};

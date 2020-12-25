const config = {
  root: 'http://localhost:4000',
  version: 'api/v1',
  paths: {
    users: 'users',
    companies: 'companies',
  },
};

export const uri = {
  baseUrl: `${config.root}/${config.version}`,
  endpoints: {
    users: {
      signup: `${config.paths.users}/signup`,
      signin: `${config.paths.users}/signin`,
      signout: `${config.paths.users}/signout`,
    },
    companies: {
      collection: config.paths.companies,
      document: `${config.paths.companies}/:id`,
    },
  },
};

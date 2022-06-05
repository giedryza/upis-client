import { loaders } from './companies.loaders';

export const converters = {
  getCompanies: ({
    data,
  }: Awaited<ReturnType<typeof loaders.getCompanies>>) => {
    return data;
  },
  getCompany: ({ data }: Awaited<ReturnType<typeof loaders.getCompany>>) => {
    return data;
  },
};

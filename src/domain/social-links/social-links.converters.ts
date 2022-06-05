import { loaders } from './social-links.loaders';

export const converters = {
  getSocialLinks: ({
    data,
  }: Awaited<ReturnType<typeof loaders.getSocialLinks>>) => {
    return data;
  },
  getSocialLink: ({
    data,
  }: Awaited<ReturnType<typeof loaders.getSocialLink>>) => {
    return data;
  },
};

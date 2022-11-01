import { useQuery } from 'react-query';

import { imagesKeys } from './images.keys';
import { useLoaders } from './images.loaders';
import { converters } from './images.converters';

export const useImage = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery(
    imagesKeys.detail(id),
    () => loaders.getImage({ id }),
    {
      enabled: !!id,
      select: converters.getImage,
    }
  );

  return query;
};

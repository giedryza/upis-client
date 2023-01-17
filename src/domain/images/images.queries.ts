import { useQuery } from '@tanstack/react-query';

import { imagesKeys } from './images.keys';
import { useLoaders } from './images.loaders';
import { converters } from './images.converters';

export const useImage = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: imagesKeys.detail(id),
    queryFn: () => loaders.getImage({ id }),
    enabled: !!id,
    select: converters.getImage,
  });

  return query;
};

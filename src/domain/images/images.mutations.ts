import { useMutation } from 'react-query';

import { useLoaders } from './images.loaders';

export const useDeleteImage = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.deleteImage);

  return mutation;
};

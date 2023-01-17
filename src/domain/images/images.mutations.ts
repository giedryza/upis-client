import { useMutation, useQueryClient } from '@tanstack/react-query';

import { imagesKeys } from './images.keys';
import { useLoaders } from './images.loaders';

export const useUpdateImage = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.updateImage, {
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries(imagesKeys.detail(id));
    },
  });

  return mutation;
};

export const useDeleteImage = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.deleteImage);

  return mutation;
};

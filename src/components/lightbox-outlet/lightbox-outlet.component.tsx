import { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'tools/services';
import { Lightbox } from 'ui';
import { lightbox, selectLightbox } from 'domain/lightbox';

export const LightboxOutlet: FC = () => {
  const dispatch = useAppDispatch();

  const { isOpen, images, currentImage } = useAppSelector(selectLightbox);

  return isOpen ? (
    <Lightbox
      id="lightbox"
      isOpen={isOpen}
      onClose={() => {
        dispatch(lightbox.actions.close());
      }}
      images={images}
      currentImageId={currentImage}
    />
  ) : null;
};

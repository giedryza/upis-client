import { VFC } from 'react';

import { useAppDispatch, useAppSelector } from 'tools/services/store';
import { Lightbox } from 'ui';
import { lightbox, selectLightbox } from 'domain/lightbox';

export const LightboxContainer: VFC = () => {
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

import { useRef, FC, useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  FocusScope,
  mergeProps,
  OverlayContainer,
  useDialog,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria';

import { Button, Carousel } from 'ui';

import { Props } from './lightbox.types';
import { useFullscreen } from './lightbox.hooks';
import styles from './lightbox.module.scss';

export const Lightbox: FC<Props> = ({
  id,
  isOpen,
  onClose,
  images,
  currentImageId,
}) => {
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);

  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      isDismissable: true,
    },
    ref
  );
  const { modalProps } = useModal();
  const { dialogProps } = useDialog(
    {
      id,
      role: 'dialog',
    },
    ref
  );

  const sorted = useMemo(
    () => [...images].sort((image) => -Number(image.id === currentImageId)),
    [currentImageId, images]
  );

  usePreventScroll();
  const { isFullscreen } = useFullscreen();

  return (
    <OverlayContainer>
      <div className={styles.lightbox} {...underlayProps}>
        <FocusScope contain restoreFocus autoFocus={false}>
          <div
            {...mergeProps(overlayProps, dialogProps, modalProps, { ref })}
            className={styles.box}
          >
            <div className={styles.header}>
              <div className={styles.actions}>
                {isFullscreen ? (
                  <Button
                    icon="arrows-in"
                    variant="tertiary"
                    size="sm"
                    attributes={{
                      onClick: () => document.exitFullscreen(),
                      title: t('common:components.lightbox.fullscreen.exit'),
                    }}
                  />
                ) : (
                  <Button
                    icon="arrows-out"
                    variant="tertiary"
                    size="sm"
                    attributes={{
                      onClick: () => ref.current?.requestFullscreen?.(),
                      title: t('common:components.lightbox.fullscreen.enter'),
                    }}
                  />
                )}
                <Button
                  icon="close"
                  variant="tertiary"
                  size="sm"
                  attributes={{
                    onClick: onClose,
                    title: t('common:actions.close'),
                  }}
                />
              </div>
            </div>

            <Carousel
              images={sorted}
              options={{
                fit: 'contain',
                behavior: 'auto',
                size: 'lg',
                keyboard: true,
              }}
              meta
            />
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
};

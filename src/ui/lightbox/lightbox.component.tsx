import { useRef, FC, useState } from 'react';
import { clsx } from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import {
  FocusScope,
  mergeProps,
  OverlayContainer,
  OverlayProvider,
  useDialog,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria';

import { Button } from 'ui';

import { LightboxComposition, Props } from './lightbox.types';
import { useFullscreen } from './lightbox.hooks';
import styles from './lightbox.module.scss';

export const Lightbox: FC<Props> & LightboxComposition = ({
  id,
  isOpen,
  onClose,
  images,
  currentImageId,
}) => {
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(
    currentImageId
      ? Math.max(
          images.findIndex((image) => image.id === currentImageId),
          0
        )
      : 0
  );

  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      isDismissable: true,
    },
    ref
  );
  const { modalProps } = useModal();
  const { dialogProps, titleProps } = useDialog(
    {
      id,
      role: 'dialog',
    },
    ref
  );

  usePreventScroll();
  const { isFullscreen } = useFullscreen();

  const onPrevious = () => {
    setIndex((prevIndex) =>
      prevIndex <= 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const onNext = () => {
    setIndex((prevIndex) =>
      prevIndex + 1 >= images.length ? 0 : prevIndex + 1
    );
  };

  const currentImage = images.at(index);

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

            <div className={styles.body}>
              <div className={styles.imageContainer}>
                <div className={clsx([styles.sidebar, styles['-left']])}>
                  <Button
                    icon="chevron-left"
                    variant="tertiary"
                    size="lg"
                    attributes={{
                      title: t('common:components.lightbox.previous'),
                      onClick: onPrevious,
                    }}
                  />
                </div>
                <div className={clsx([styles.sidebar, styles['-right']])}>
                  <Button
                    icon="chevron-right"
                    variant="tertiary"
                    size="lg"
                    attributes={{
                      title: t('common:components.lightbox.next'),
                      onClick: onNext,
                    }}
                  />
                </div>

                <img
                  className={styles.image}
                  src={currentImage?.url}
                  alt={currentImage?.alt}
                />
              </div>

              <div className={styles.meta}>
                <h2 {...titleProps} className={styles.title}>
                  {currentImage?.alt}
                </h2>
                <span className={styles.step}>
                  {index + 1}/{images.length}
                </span>
              </div>
            </div>
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
};

Lightbox.Provider = OverlayProvider;

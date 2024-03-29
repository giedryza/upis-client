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
import { APP } from 'config';

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
        <FocusScope contain restoreFocus autoFocus>
          <div
            {...mergeProps(overlayProps, dialogProps, modalProps, { ref })}
            className={styles.box}
          >
            <div className={styles.header}>
              <div className={styles.actions}>
                {isFullscreen ? (
                  <Button
                    as="button"
                    icon="arrows-in"
                    variant="tertiary"
                    size="sm"
                    onClick={() => document.exitFullscreen()}
                    title={t('common:components.lightbox.fullscreen.exit')}
                  />
                ) : (
                  <Button
                    as="button"
                    icon="arrows-out"
                    variant="tertiary"
                    size="sm"
                    onClick={() => ref.current?.requestFullscreen?.()}
                    title={t('common:components.lightbox.fullscreen.enter')}
                  />
                )}
                <Button
                  as="button"
                  icon="close"
                  variant="tertiary"
                  size="sm"
                  onClick={onClose}
                  title={t('common:actions.close')}
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
                focusable: false,
              }}
              sizes={{
                xs: APP.breakpoints.xs,
                sm: APP.breakpoints.sm,
                md: APP.breakpoints.md,
                lg: APP.breakpoints.lg,
                default: 2000,
              }}
              meta
            />
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
};

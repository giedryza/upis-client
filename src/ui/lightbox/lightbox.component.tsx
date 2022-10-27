import { useRef, FC, useState, useEffect, useMemo, UIEvent } from 'react';
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
  const sliderRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);

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

  const onScroll = ({ currentTarget }: UIEvent<HTMLDivElement>) => {
    if (!sliderRef.current?.clientWidth) {
      return;
    }

    if (currentTarget.scrollLeft % sliderRef.current.clientWidth === 0) {
      setIndex(currentTarget.scrollLeft / sliderRef.current.clientWidth);
    }
  };

  const sorted = useMemo(() => {
    return [...images].sort((image) => -Number(image.id === currentImageId));
  }, [currentImageId, images]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scroll({
      left: index * slider.clientWidth,
    });
  }, [index, isFullscreen]);

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

            <div
              className={clsx([styles.slider, styles.snap, 'scrollbar-hidden'])}
              onScroll={onScroll}
              ref={sliderRef}
            >
              {sorted.map((image) => (
                <div className={styles.slide} key={image.id}>
                  <img
                    className={styles.image}
                    src={image.url}
                    alt={image.alt}
                  />
                </div>
              ))}
            </div>

            <div className={styles.meta}>
              <h2 {...titleProps} className={styles.title}>
                {sorted.at(index)?.alt}
              </h2>
              <span className={styles.step}>
                {index + 1}/{images.length}
              </span>
            </div>
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
};

Lightbox.Provider = OverlayProvider;

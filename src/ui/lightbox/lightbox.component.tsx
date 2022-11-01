import { useRef, FC, useState, useEffect, useMemo, UIEvent } from 'react';
import { clsx } from 'clsx';
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

import { Button } from 'ui';
import { useEventListener } from 'tools/hooks';

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
  const sliderRef = useRef<HTMLUListElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

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

  const sorted = useMemo(
    () => [...images].sort((image) => -Number(image.id === currentImageId)),
    [currentImageId, images]
  );
  const scrollable = images.length > 1;

  const onPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? prevIndex : prevIndex - 1
    );
  };

  const onNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= images.length ? prevIndex : prevIndex + 1
    );
  };

  const onScroll = ({ currentTarget }: UIEvent<HTMLUListElement>) => {
    if (!scrollable) return;

    if (!sliderRef.current?.clientWidth) {
      return;
    }

    if (currentTarget.scrollLeft % sliderRef.current.clientWidth === 0) {
      setCurrentIndex(currentTarget.scrollLeft / sliderRef.current.clientWidth);
    }
  };

  const onKeyup = (e: KeyboardEvent) => {
    if (!scrollable) return;

    if (e.key === 'ArrowRight') onNext();

    if (e.key === 'ArrowLeft') onPrev();
  };

  usePreventScroll();
  useEventListener('keyup', onKeyup);
  const { isFullscreen } = useFullscreen();

  useEffect(() => {
    if (!scrollable) return;

    const slider = sliderRef.current;

    if (!slider) return;

    slider.scroll({
      left: currentIndex * slider.clientWidth,
    });
  }, [currentIndex, isFullscreen, scrollable]);

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

            {scrollable && (
              <>
                <div className={clsx([styles.sidebar, styles['-left']])}>
                  <Button
                    icon="chevron-left"
                    variant="tertiary"
                    size="lg"
                    attributes={{
                      title: t('common:components.lightbox.previous'),
                      onClick: onPrev,
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
              </>
            )}

            <ul
              className={clsx([styles.slider, styles.snap, 'scrollbar-hidden'])}
              onScroll={onScroll}
              ref={sliderRef}
            >
              {sorted.map((image) => (
                <li className={styles.slide} key={image.id}>
                  <img
                    className={styles.image}
                    src={image.url}
                    alt={image.alt}
                  />
                </li>
              ))}
            </ul>

            <div className={styles.meta}>
              <h2 {...titleProps} className={styles.title}>
                {sorted.at(currentIndex)?.alt}
              </h2>
              <span className={styles.step}>
                {currentIndex + 1}/{images.length}
              </span>
            </div>
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
};

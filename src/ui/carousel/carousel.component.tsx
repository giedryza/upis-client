import { useRef, useState, VFC, UIEvent, useEffect } from 'react';
import { clsx } from 'clsx';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';
import { useEventListener } from 'tools/hooks';

import { Props } from './carousel.types';
import styles from './carousel.module.scss';

export const Carousel: VFC<Props> = ({
  images,
  meta = false,
  options = {},
}) => {
  const {
    fit = 'cover',
    behavior = 'smooth',
    size = 'md',
    keyboard = false,
  } = options;

  const { t } = useTranslation();

  const sliderRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    if (!scrollable || !keyboard) return;

    if (e.key === 'ArrowRight') onNext();

    if (e.key === 'ArrowLeft') onPrev();
  };

  useEventListener('keyup', onKeyup);

  useEffect(() => {
    if (!scrollable) return;

    sliderRef.current?.scroll({
      left: currentIndex * sliderRef.current.clientWidth,
      behavior,
    });
  }, [currentIndex, behavior, scrollable, sliderRef.current?.clientWidth]);

  return (
    <div className={clsx(styles.carousel, styles[`-size-${size}`])}>
      {scrollable && (
        <>
          <div className={clsx([styles.sidebar, styles['-left']])}>
            <Button
              icon="chevron-left"
              variant="tertiary"
              size={size}
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
              size={size}
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
        {images.map((image) => (
          <li className={styles.slide} key={image.id}>
            <img
              className={clsx(styles.image, styles[`-fit-${fit}`])}
              src={image.url}
              alt={image.alt}
            />
          </li>
        ))}
      </ul>

      {meta && (
        <div className={styles.meta}>
          <h2 className={styles.title}>{images.at(currentIndex)?.alt}</h2>
          <span className={styles.step}>
            {currentIndex + 1}/{images.length}
          </span>
        </div>
      )}
    </div>
  );
};

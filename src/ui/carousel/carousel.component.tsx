import { useRef, useState, VFC, useEffect } from 'react';
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
  const hasNext = currentIndex + 1 < images.length;
  const hasPrev = currentIndex > 0;

  const onPrev = () => {
    if (!hasPrev) return;

    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const onNext = () => {
    if (!hasNext) return;

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const onScroll = ({ target }: Event) => {
    if (!scrollable) return;

    // @ts-expect-error
    const { clientWidth, scrollLeft } = target;

    if (typeof clientWidth !== 'number' || typeof scrollLeft !== 'number')
      return;

    if (scrollLeft % clientWidth === 0) {
      setCurrentIndex(scrollLeft / clientWidth);
    }
  };

  const onKeyup = (e: KeyboardEvent) => {
    if (!scrollable || !keyboard) return;

    if (e.key === 'ArrowRight') onNext();

    if (e.key === 'ArrowLeft') onPrev();
  };

  useEventListener('keyup', onKeyup);
  useEventListener('scroll', onScroll, sliderRef);

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
          {hasPrev && (
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
          )}
          {hasNext && (
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
          )}
        </>
      )}

      <ul
        className={clsx([styles.slider, styles.snap, 'scrollbar-hidden'])}
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

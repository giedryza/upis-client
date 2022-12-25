import { FC, Fragment, memo } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Carousel, Icon, ImagePlaceholder } from 'ui';
import { formatCurrency, formatNumber } from 'tools/format';
import { APP } from 'config/app';
import { generateImageUrl } from 'tools/common';

import { Props } from './card.types';
import styles from './card.module.scss';

const CAROUSEL_WIDTH = Math.round(
  (APP.serp.cardHeight * APP.serp.carouselAspectRatio[0]) /
    APP.serp.carouselAspectRatio[1]
);

export const SerpCard: FC<Props> = memo(({ tour }) => {
  const { t } = useTranslation();
  const { lang } = useTranslation();

  return (
    <article className={styles.card}>
      <div
        className={styles.gallery}
        style={{
          '--width': CAROUSEL_WIDTH,
          '--height': APP.serp.cardHeight,
        }}
      >
        {tour.photos.length ? (
          <Carousel
            images={tour.photos.map((photo) => ({
              id: photo._id,
              url: generateImageUrl({
                id: photo.key,
                width: CAROUSEL_WIDTH * 2,
                height: APP.serp.cardHeight * 2,
              }),
              placeholder: generateImageUrl({
                id: photo.key,
                width: APP.serp.carouselAspectRatio[0] * 2,
                height: APP.serp.carouselAspectRatio[1] * 2,
              }),
              alt: photo.description,
            }))}
            options={{ size: 'sm' }}
            sizes={{ width: CAROUSEL_WIDTH, height: APP.serp.cardHeight }}
          />
        ) : (
          <ImagePlaceholder fit="fluid" />
        )}
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>{tour.name}</h2>

          <div>
            {tour.regions.length ? (
              <h3 className={styles.subtitle}>
                <Icon name="pin" className={styles.icon} aria-hidden />
                <span>
                  {tour.regions
                    .map((region) => t(`regions:${region}`))
                    .join(', ')}
                </span>
              </h3>
            ) : null}

            {tour.rivers.length ? (
              <h3 className={styles.subtitle}>
                <Icon name="wave" className={styles.icon} aria-hidden />
                <span>
                  {tour.rivers.map((river) => t(`rivers:${river}`)).join(', ')}
                </span>
              </h3>
            ) : null}

            <h3 className={styles.subtitle}>
              <Icon name="timer" className={styles.icon} aria-hidden />
              {[
                {
                  label: formatNumber(lang, tour.distance ?? 0, 'kilometer'),
                  value: tour.distance,
                },
                {
                  label: formatNumber(lang, tour.days, 'day'),
                  value: tour.days,
                },
                {
                  label: formatNumber(lang, tour.duration ?? 0, 'hour'),
                  value: tour.duration,
                },
              ]
                .filter((item) => Boolean(item.value))
                .map((item, i, self) => (
                  <Fragment key={i}>
                    <span>{item.label}</span>
                    {i < self.length - 1 ? <span> &bull; </span> : null}
                  </Fragment>
                ))}
            </h3>
          </div>
        </header>

        <div className={styles.body}>{null}</div>

        <footer className={styles.footer}>
          <div className={styles.price}>
            {tour.price ? (
              <>
                <div>
                  <span>{t('common:texts.from')} </span>
                  <span className={styles.em}>
                    {formatCurrency(
                      lang,
                      tour.price.amount,
                      tour.price.currency
                    )}
                  </span>
                </div>
                <div>
                  <span>{t('serp:card.texts.pricePer')}</span>
                </div>
              </>
            ) : null}
          </div>

          <Button label={t('common:actions.view')} size="sm" />
        </footer>
      </div>
    </article>
  );
});

SerpCard.displayName = 'SerpCard';

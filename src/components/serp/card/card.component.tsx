import { FC, Fragment, memo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { Button, Carousel, Icon, ImagePlaceholder } from 'ui';
import { formatCurrency, formatUnit } from 'tools/format';
import { routes, APP } from 'config';
import { generateUrl } from 'tools/services';
import { generateImageUrl, isLast } from 'tools/common';
import { useBreakpoints } from 'tools/hooks';

import { Props } from './card.types';
import styles from './card.module.scss';

const IMAGE_QUALITY = 3;

export const SerpCard: FC<Props> = memo(({ tour, userId }) => {
  const { t, lang } = useTranslation();
  const { xs } = useBreakpoints();

  return (
    <article
      className={styles.card}
      style={{
        '--width': APP.serp.card.image.width,
        '--height': APP.serp.card.image.height,
        '--ratio': xs ? 1.25 : 1,
      }}
    >
      <div className={styles.gallery}>
        {tour.photos.length ? (
          <Carousel
            images={tour.photos.map((photo) => ({
              id: photo._id,
              url: generateImageUrl({
                id: photo.key,
                width: APP.serp.card.image.width * IMAGE_QUALITY,
                height: APP.serp.card.image.height * IMAGE_QUALITY,
              }),
              placeholder: generateImageUrl({
                id: photo.key,
                width: APP.serp.card.image.aspectRatio[0] * 2,
                height: APP.serp.card.image.aspectRatio[1] * 2,
              }),
              alt: photo.description,
            }))}
            options={{ size: 'sm' }}
            sizes={{
              width: APP.serp.card.image.width,
              height: APP.serp.card.image.height,
            }}
          />
        ) : (
          <ImagePlaceholder fit="fluid" />
        )}
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <Link
              href={generateUrl(routes.tours.one.index, {
                id: tour._id,
                slug: tour.slug,
              })}
              tabIndex={-1}
            >
              {tour.name}
            </Link>
          </h2>

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
                  label: formatUnit(lang, tour.distance ?? 0, 'kilometer'),
                  value: tour.distance,
                },
                {
                  label: formatUnit(lang, tour.days, 'day'),
                  value: tour.days,
                },
                {
                  label: formatUnit(lang, tour.duration ?? 0, 'hour'),
                  value: tour.duration,
                },
              ]
                .filter((item) => Boolean(item.value))
                .map((item, i, self) => (
                  <Fragment key={i}>
                    <span>{item.label}</span>
                    {!isLast(self, i) ? <span> &bull; </span> : null}
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
                  <span>{t('common:components.serpCard.texts.pricePer')}</span>
                </div>
              </>
            ) : null}
          </div>

          <div className={styles.actions}>
            {userId === tour.user ? (
              <Button
                as="link"
                icon="pencil"
                size="xs"
                variant="ghost"
                title={t('common:actions.edit')}
                href={generateUrl(routes.account.tours.one.index, {
                  id: tour._id,
                })}
              />
            ) : null}
            <Button
              as="link"
              label={t('common:actions.view')}
              size="sm"
              variant="primary"
              href={generateUrl(routes.tours.one.index, {
                id: tour._id,
                slug: tour.slug,
              })}
            />
          </div>
        </footer>
      </div>
    </article>
  );
});

SerpCard.displayName = 'SerpCard';

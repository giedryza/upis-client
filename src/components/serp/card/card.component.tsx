import { FC, Fragment, memo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { Button, Carousel, Icon, ImagePlaceholder } from 'ui';
import { formatCurrency, formatUnit } from 'tools/format';
import { routes, APP } from 'config';
import { generateImageUrl, generateUrl } from 'tools/services';
import { isLast } from 'tools/common';
import { useBreakpoints, useQueryNavigation } from 'tools/hooks';
import { useFavoritesContext } from 'domain/favorites';

import { Props } from './card.types';
import styles from './card.module.scss';

export const SerpCard: FC<Props> = memo(({ tour, userId }) => {
  const { t, lang } = useTranslation();
  const { xs } = useBreakpoints();
  const { navigateWithQuery } = useQueryNavigation();

  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesContext();

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
                width: APP.serp.card.image.width * APP.serp.card.image.quality,
                height:
                  APP.serp.card.image.height * APP.serp.card.image.quality,
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
              title={tour.name}
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
        </footer>
      </div>

      <ul className={styles.floatingActions}>
        <li>
          {favorites.includes(tour._id) ? (
            <Button
              as="button"
              title={t('common:layout.secondary_nav.saved')}
              icon="heart-f"
              size="xs"
              variant="secondary"
              onClick={() => {
                removeFromFavorites(tour._id);
              }}
            />
          ) : (
            <Button
              as="button"
              title={t('common:actions.save')}
              icon="heart"
              size="xs"
              variant="secondary"
              onClick={() => {
                addToFavorites(tour._id);
              }}
            />
          )}
        </li>
        {userId === tour.user ? (
          <li>
            <Button
              as="link"
              title={t('common:actions.edit')}
              icon="pencil"
              size="xs"
              variant="secondary"
              href={generateUrl(routes.account.tours.one.index, {
                id: tour._id,
              })}
            />
          </li>
        ) : null}
      </ul>
    </article>
  );
});

SerpCard.displayName = 'SerpCard';

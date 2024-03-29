import { FC, Fragment } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { APP, routes } from 'config';
import { generateImageUrl, generateUrl } from 'tools/services';
import { isLast } from 'tools/common';
import { formatCurrency, formatUnit } from 'tools/format';
import { Button, Carousel, Icon } from 'ui';

import { Props } from './infobox.types';
import styles from './infobox.module.scss';

export const Infobox: FC<Props> = ({
  useMap,
  _id,
  slug,
  name,
  photos,
  distance,
  days,
  duration,
  price,
}) => {
  const { t, lang } = useTranslation();

  const map = useMap();

  return (
    <div
      className={styles.infobox}
      style={{
        '--width': APP.serp.infobox.image.width,
        '--height': APP.serp.infobox.image.height,
      }}
    >
      {photos.length ? (
        <div className={styles.gallery}>
          <Carousel
            images={photos.map((photo) => ({
              id: photo._id,
              url: generateImageUrl({
                id: photo.key,
                width:
                  APP.serp.card.image.width * APP.serp.infobox.image.quality,
                height:
                  APP.serp.card.image.height * APP.serp.infobox.image.quality,
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
        </div>
      ) : null}
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link
            href={generateUrl(routes.tours.one.index, { id: _id, slug })}
            tabIndex={-1}
          >
            {name}
          </Link>
        </h3>

        <h4 className={styles.subtitle}>
          {[
            {
              label: formatUnit(lang, distance ?? 0, 'kilometer'),
              value: distance,
            },
            {
              label: formatUnit(lang, days, 'day'),
              value: days,
            },
            {
              label: formatUnit(lang, duration ?? 0, 'hour'),
              value: duration,
            },
          ]
            .filter((item) => Boolean(item.value))
            .map((item, i, self) => (
              <Fragment key={i}>
                <span>{item.label}</span>
                {!isLast(self, i) ? <span> &bull; </span> : null}
              </Fragment>
            ))}
        </h4>

        <div className={styles.footer}>
          <div className={styles.price}>
            {price ? (
              <>
                <div>{t('common:texts.from')}</div>
                <div className={styles.em}>
                  {formatCurrency(lang, price.amount, price.currency)}
                </div>
              </>
            ) : null}
          </div>

          <Button
            as="link"
            variant="primary"
            size="xs"
            label={t('common:actions.view')}
            href={generateUrl(routes.tours.one.index, { id: _id, slug })}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={() => {
            map.closePopup();
          }}
          aria-label={t('common:actions.close')}
          type="button"
        >
          <Icon name="close" className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

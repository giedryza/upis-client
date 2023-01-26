import { FC, Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { APP } from 'config/app';
import { generateImageUrl, isLast } from 'tools/common';
import { formatCurrency, formatNumber } from 'tools/format';
import { Button, Carousel, Icon } from 'ui';

import { Props } from './infobox.types';
import styles from './infobox.module.scss';

const TOUR = {
  _id: '63a3dca8fd715ee41c67ab2e',
  name: 'Labai ilgas pavadinimas, kuris tikrai netilps į vieną eilutę',
  slug: 'akyje',
  description: 'about about',
  website: 'www.miskais.lt',
  departure: {
    type: 'Point',
    coordinates: [23.7359619140625, 55.06264118216743],
  },
  arrival: {
    type: 'Point',
    coordinates: [24.565429687500004, 54.63887647795803],
  },
  distance: 9,
  duration: 2.5,
  days: 1,
  difficulty: 1,
  rivers: ['spengla_merkys', 'nemunas'],
  regions: ['dzukija'],
  price: {
    amount: 2249,
    currency: 'EUR',
    _id: '63bc06735ce1be9348cd5802',
  },
  amenities: [
    {
      _id: '63c439313201444adfd46cbb',
      variant: 'life-vest',
    },
    {
      _id: '63c53afa0c6b2e8c502559d2',
      variant: 'camera',
    },
    {
      _id: '63c63c8d0fe7df3bf8d39091',
      variant: 'transport',
    },
    {
      _id: '63c63c960fe7df3bf8d3909e',
      variant: 'child-seat',
    },
    {
      _id: '63c63ca30fe7df3bf8d390ab',
      variant: 'phone-case',
    },
    {
      _id: '63c63cac0fe7df3bf8d390b8',
      variant: 'dry-bag',
    },
    {
      _id: '63c63cb80fe7df3bf8d390c5',
      variant: 'tent',
    },
    {
      _id: '63c63cc10fe7df3bf8d390d3',
      variant: 'sleeping-bag',
    },
    {
      _id: '63c63ccb0fe7df3bf8d390e1',
      variant: 'grill',
    },
    {
      _id: '63c63cdb0fe7df3bf8d390ef',
      variant: 'guide',
    },
    {
      _id: '63c63ce50fe7df3bf8d390fd',
      variant: 'pet-friendly',
    },
  ],
  photos: [
    {
      _id: '63a5c3a575f3758b78874021',
      url: 'https://res.cloudinary.com/upis/image/upload/v1671807909/upis/development/12594939-bf04-471b-b42e-0570361897bf.jpg',
      key: 'upis/development/12594939-bf04-471b-b42e-0570361897bf',
      contentType: 'image/jpeg',
      description: 'vyras miške',
      user: '5f886ac009e66f27b4355b9c',
      createdAt: '2022-12-23T15:05:09.528Z',
      updatedAt: '2023-01-09T12:16:57.354Z',
      __v: 0,
    },
    {
      _id: '63a5c3b375f3758b7887403e',
      url: 'https://res.cloudinary.com/upis/image/upload/v1671807922/upis/development/4965708b-48a5-477f-bf7b-8e920e3c62ca.jpg',
      key: 'upis/development/4965708b-48a5-477f-bf7b-8e920e3c62ca',
      contentType: 'image/jpeg',
      description: '',
      user: '5f886ac009e66f27b4355b9c',
      createdAt: '2022-12-23T15:05:23.030Z',
      updatedAt: '2022-12-23T15:05:23.030Z',
      __v: 0,
    },
    {
      _id: '63a60d4087fc43457102e919',
      url: 'https://res.cloudinary.com/upis/image/upload/v1671826752/upis/development/3b258f9d-35a1-41d8-9c83-9ffd463cc59e.jpg',
      key: 'upis/development/3b258f9d-35a1-41d8-9c83-9ffd463cc59e',
      contentType: 'image/jpeg',
      description: '',
      user: '5f886ac009e66f27b4355b9c',
      createdAt: '2022-12-23T20:19:12.294Z',
      updatedAt: '2022-12-23T20:19:12.294Z',
      __v: 0,
    },
    {
      _id: '63a60d4987fc43457102e936',
      url: 'https://res.cloudinary.com/upis/image/upload/v1671826762/upis/development/99e3d9ba-12ac-476d-a6d8-a81fdff7bb76.jpg',
      key: 'upis/development/99e3d9ba-12ac-476d-a6d8-a81fdff7bb76',
      contentType: 'image/jpeg',
      description: '',
      user: '5f886ac009e66f27b4355b9c',
      createdAt: '2022-12-23T20:19:21.804Z',
      updatedAt: '2022-12-23T20:19:21.804Z',
      __v: 0,
    },
  ],
  primaryPhoto: '',
  provider: '634e772ee7a326a8e9ebb6ef',
  user: '5f886ac009e66f27b4355b9c',
  createdAt: '2022-12-22T04:27:20.068Z',
  updatedAt: '2023-01-25T13:47:48.448Z',
  __v: 5,
  score: 16.5,
} as const;

export const Infobox: FC<Props> = ({ useMap }) => {
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
      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={() => {
            map.closePopup();
          }}
          type="button"
        >
          <Icon name="close" className={styles.icon} />
        </button>
      </div>

      {TOUR.photos.length ? (
        <div className={styles.gallery}>
          <Carousel
            images={TOUR.photos.map((photo) => ({
              id: photo._id,
              url: generateImageUrl({
                id: photo.key,
                width: APP.serp.card.image.width * 2,
                height: APP.serp.card.image.height * 2,
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
        <h3 className={styles.title}>{TOUR.name}</h3>

        <h4 className={styles.subtitle}>
          {[
            {
              label: formatNumber(lang, TOUR.distance ?? 0, 'kilometer'),
              value: TOUR.distance,
            },
            {
              label: formatNumber(lang, TOUR.days, 'day'),
              value: TOUR.days,
            },
            {
              label: formatNumber(lang, TOUR.duration ?? 0, 'hour'),
              value: TOUR.duration,
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
            {TOUR.price ? (
              <>
                <div>{t('common:texts.from')}</div>
                <div className={styles.em}>
                  {formatCurrency(lang, TOUR.price.amount, TOUR.price.currency)}
                </div>
              </>
            ) : null}
          </div>

          <Button
            variant="primary"
            size="xs"
            label={t('common:actions.view')}
          />
        </div>
      </div>
    </div>
  );
};

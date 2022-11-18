import { FC, memo } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Carousel, Icon } from 'ui';
import { formatCurrency } from 'tools/format';

import { Props } from './card.types';
import styles from './card.module.scss';

const titles = [
  'The salt of the Wicked',
  'Secret of the Silent Porter in the middle of somewhere strangeSecret of the Silent Porter in the middle of somewhere strange',
  'Burning Dreamer',
  'The King of the Magician',
  'The Trembling Silk',
  'Dreamer of Prophecy',
  "The Secrets's Shores",
  'The Doors of the Serpent',
  'Year in the Theft',
];

export const SerpCard: FC<Props> = memo(({ id }) => {
  const { lang } = useTranslation();

  const separator = <span> &bull; </span>;

  return (
    <article className={styles.card}>
      <div className={styles.gallery}>
        <Carousel
          images={Array.from({ length: 5 }).map((_, i) => ({
            id: `${id}-${String(i)}`,
            url: `https://picsum.photos/400/300?random=${id + i}`,
            alt: '',
          }))}
          options={{
            size: 'sm',
          }}
        />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            {titles[Number(id)] ?? 'Lorem Ipsum'}
          </h2>

          <div>
            <h3 className={styles.subtitle}>
              <Icon name="pin" className={styles.icon} aria-hidden />
              <span>{['Aukštaitija', 'Dzūkija'].join(', ')}</span>
            </h3>

            <h3 className={styles.subtitle}>
              <Icon name="wave" className={styles.icon} aria-hidden />
              <span>
                {[
                  'Merkys',
                  'Agluona',
                  'Nemunas',
                  'Šventoji',
                  'Neris',
                  'Minija',
                  'Musė',
                  'Karaliaus Vilhelmo kanalas',
                  'Danė',
                ].join(', ')}
              </span>
            </h3>

            <h3 className={styles.subtitle}>
              <Icon name="timer" className={styles.icon} aria-hidden />
              <span>45km</span>
              {separator}
              <span>1 day</span>
              {separator}
              <span>8.5h</span>
            </h3>
          </div>
        </header>

        <div className={styles.body}>{null}</div>

        <footer className={styles.footer}>
          <div className={styles.price}>
            <div>
              <span>From </span>
              <span className={styles.em}>
                {formatCurrency(lang, 4500, 'EUR')}
              </span>
            </div>
            <div>
              <span>per person, per day</span>
            </div>
          </div>
          <Button label="View" size="sm" />
        </footer>
      </div>
    </article>
  );
});

SerpCard.displayName = 'SerpCard';

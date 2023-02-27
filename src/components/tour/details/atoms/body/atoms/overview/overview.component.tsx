import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Meter } from 'ui';
import { formatList, formatNumber } from 'tools/format';

import { Props } from './overview.types';
import styles from './overview.module.scss';

export const BodyOverview: FC<Props> = ({
  regions,
  rivers,
  difficulty,
  distance,
  duration,
  days,
  boats,
}) => {
  const { t, lang } = useTranslation();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t('tours:details.overview.title')}</h2>

      <ul className={styles.grid}>
        {regions.length ? (
          <li className={styles.group}>
            <span className={styles.label}>
              {t('tours:details.regions.title')}
            </span>
            <span className={styles.value}>
              {formatList(
                lang,
                regions.map((region) => t(`regions:${region}`))
              )}
            </span>
          </li>
        ) : null}

        {rivers.length ? (
          <li className={styles.group}>
            <span className={styles.label}>
              {t('tours:details.rivers.title')}
            </span>
            <span className={styles.value}>
              {formatList(
                lang,
                rivers.map((river) => t(`rivers:${river}`))
              )}
            </span>
          </li>
        ) : null}

        {distance ? (
          <li className={styles.group}>
            <span className={styles.label}>
              {t('tours:details.distance.title')}
            </span>
            <span className={styles.value}>
              {formatNumber(lang, distance, 'kilometer')}
            </span>
          </li>
        ) : null}

        {duration ? (
          <li className={styles.group}>
            <span className={styles.label}>
              {t('tours:details.duration.title')}
            </span>
            <span className={styles.value}>
              {formatNumber(lang, duration, 'hour')}
            </span>
          </li>
        ) : null}

        {days ? (
          <li className={styles.group}>
            <span className={styles.label}>
              {t('tours:details.days.title')}
            </span>
            <span className={styles.value}>
              {formatNumber(lang, days, 'day')}
            </span>
          </li>
        ) : null}

        {boats.length ? (
          <li className={styles.group}>
            <span className={styles.label}>
              {t('tours:details.boats.title')}
            </span>
            <span className={styles.value}>
              {formatList(
                lang,
                boats.map((boat) => t(`common:boats.${boat}`))
              )}
            </span>
          </li>
        ) : null}

        {difficulty ? (
          <li className={styles.group}>
            <span className={styles.label}>
              {t('tours:details.difficulty.title')}
            </span>
            <span className={styles.value}>
              <Meter
                ariaLabel="Sudėtingumas"
                min={0}
                max={5}
                value={difficulty}
                valueLabel={[difficulty, 5].join(' / ')}
                variant="primary"
              />
            </span>
          </li>
        ) : null}
      </ul>
    </section>
  );
};

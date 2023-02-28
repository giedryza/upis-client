import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { toExternalLink } from 'tools/common';
import { Icon } from 'ui';
import { useActiveTour } from 'domain/tours';

import styles from './header.module.scss';

export const DetailsHeader: FC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{tour?.name}</h1>

      {[tour?.website].filter(Boolean).length ? (
        <div className={styles.info}>
          {tour?.website ? (
            <a
              href={toExternalLink(tour.website)}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t('tours:actions.visit_website')}</span>
              <Icon
                // TODO: replace with external icon
                name="chevron-right"
                className={styles.icon}
                focusable={false}
                aria-hidden
              />
            </a>
          ) : null}
        </div>
      ) : null}
    </header>
  );
};

import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Props } from './description.types';
import styles from './description.module.scss';

export const BodyDescription: FC<Props> = ({ description }) => {
  const { t } = useTranslation();

  if (!description) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t('tours:details.description.title')}</h2>
      <p className={styles.description}>{description}</p>
    </section>
  );
};

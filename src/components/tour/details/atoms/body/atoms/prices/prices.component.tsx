import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Toast } from 'ui';
import { formatCurrency } from 'tools/format';

import { Props } from './prices.types';
import styles from './prices.module.scss';

export const BodyPrices: FC<Props> = ({ price }) => {
  const { t, lang } = useTranslation();

  if (!price) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t('tours:details.prices.title')}</h2>

      <div className={styles.price}>
        <span>{t('common:texts.from')} </span>
        <span className={styles.em}>
          {formatCurrency(lang, price.amount, price.currency)}
        </span>
      </div>

      <Toast message={t('tours:details.prices.info')} />
    </section>
  );
};

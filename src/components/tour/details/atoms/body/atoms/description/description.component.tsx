import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';
import { useTruncate } from 'tools/hooks';

import { Props } from './description.types';
import styles from './description.module.scss';

export const BodyDescription: FC<Props> = ({ description }) => {
  const { t } = useTranslation();

  const { text, shouldTruncate, isTruncated, onTruncate } = useTruncate({
    text: description,
    maxLength: 500,
  });

  if (!description) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t('tours:details.description.title')}</h2>
      <p className={styles.description}>{text}</p>
      {shouldTruncate ? (
        <Button
          as="button"
          variant="link"
          size="sm"
          label={
            isTruncated
              ? t('common:actions.show_more')
              : t('common:actions.show_less')
          }
          onClick={() => onTruncate((prev) => !prev)}
        />
      ) : null}
    </section>
  );
};

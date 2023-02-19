import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Icon } from 'ui';

import styles from './header.module.scss';

export const DetailsHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Aukštaitijos upėmis ir skardžiais</h1>

      <div className={styles.extras}>
        <div className={styles.info}>
          <div className={styles.item}>
            <Icon name="kayak" className={styles.icon} />
            <span>Aukštaitijos baidarės</span>
          </div>

          <span> &bull; </span>

          <div className={styles.item}>
            <Icon name="globe" className={styles.icon} />
            <span>Visit website</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            label={t('common:actions.save')}
            icon="star"
            variant="ghost"
            size="xs"
          />
        </div>
      </div>
    </header>
  );
};

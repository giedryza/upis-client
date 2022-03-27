import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';

import { Button, Icon } from 'ui';

import { Props } from './info-block.types';
import styles from './info-block.module.scss';

export const InfoBlock: FC<Props> = ({
  title,
  icon,
  editPage,
  columns = 2,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <section className={styles.container} style={{ '--grid-columns': columns }}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <Icon name={icon} className={styles.icon} />
          <h2 className={styles.title}>{title}</h2>
        </div>

        {!!editPage && (
          <Button
            label={t('common:actions.edit')}
            icon="pencil"
            size="xs"
            url={editPage}
          />
        )}
      </div>

      <div
        className={clsx(styles.content, {
          [`${styles.single}`]: columns === 1,
        })}
      >
        {children}
      </div>
    </section>
  );
};

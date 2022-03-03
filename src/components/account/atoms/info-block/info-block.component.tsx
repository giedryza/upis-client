import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Icon, IconName } from 'ui';

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
    <div className={styles.container} style={{ '--_grid-columns': columns }}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <Icon name={icon} className={styles.icon} />
          <h2 className={styles.title}>{title}</h2>
        </div>

        {!!editPage && (
          <Button
            label={t('common:actions.edit')}
            icon={IconName.Pencil}
            size="xs"
            url={editPage}
          />
        )}
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};

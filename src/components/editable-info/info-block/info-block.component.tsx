import { FC, ReactNode } from 'react';

import styles from './info-block.module.scss';

import { Icon, IconName } from 'ui/icon/icon.component';

interface Props {
  info: string;
  label: string;
  icon?: IconName;
  actions?: ReactNode;
}

const InfoBlock: FC<Props> = ({ info, label, icon, actions }) => {
  return (
    <div className={styles.container}>
      {icon && (
        <div className={styles.icon}>
          <Icon name={icon} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.title}>{info}</div>
        <div className={styles.subtitle}>{label}</div>
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export { InfoBlock };

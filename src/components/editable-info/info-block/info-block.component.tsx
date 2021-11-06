import { FC, ReactNode } from 'react';

import styles from './info-block.module.scss';

import { Icon, IconName } from 'ui/icon/icon.component';
import { EditInfoVariant } from 'components/editable-info/edit-info.types';

interface Props {
  info: string;
  label: string;
  icon?: IconName;
  actions?: ReactNode;
  variant: EditInfoVariant;
}

const InfoBlock: FC<Props> = ({ info, label, icon, actions, variant }) => {
  return (
    <div className={styles.container}>
      {variant === 'edit' ? (
        <>
          {icon && (
            <div className={styles.icon}>
              <Icon name={icon} />
            </div>
          )}
          <div className={styles.content}>
            <div className={styles.title}>{info}</div>
            <div className={styles.subtitle}>{label}</div>
          </div>
        </>
      ) : null}

      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export { InfoBlock };

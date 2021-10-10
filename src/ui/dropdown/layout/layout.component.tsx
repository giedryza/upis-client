import { FC } from 'react';

import styles from './layout.module.scss';
import { Props, Labels } from './layout.types';

import { Button } from 'ui/button/button.component';
import { IconName } from 'ui/icon/icon.component';

const Layout: FC<Props> = ({
  id,
  title = '',
  labels,
  onSubmit,
  onCancel,
  onClose,
  children,
}) => {
  return (
    <div className={styles.container} aria-labelledby={id}>
      <header>
        <h2>{title}</h2>
        <ul>
          <li>
            <Button
              icon={IconName.Close}
              styleType="ghost"
              size="xs"
              attributes={{
                title: labels.close,
                'aria-label': labels.close,
                onClick: onClose,
              }}
            />
          </li>
        </ul>
      </header>
      <div>{children}</div>
      <footer>
        <ul>
          <li>
            <Button
              label={labels.cancel}
              styleType="ghost"
              size="sm"
              attributes={{
                onClick: onCancel,
              }}
            />
          </li>
          <li>
            <Button
              label={labels.submit}
              styleType="primary"
              size="sm"
              attributes={{
                onClick: onSubmit,
              }}
            />
          </li>
        </ul>
      </footer>
    </div>
  );
};

export { Layout };
export type { Labels };

import { FC } from 'react';

import { Button } from 'ui/button/button.component';
import { IconName } from 'ui/icon/icon.component';

import styles from './layout.module.scss';
import { Props, Labels } from './layout.types';

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
              variant="ghost"
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
              variant="ghost"
              size="sm"
              attributes={{
                onClick: onCancel,
              }}
            />
          </li>
          <li>
            <Button
              label={labels.submit}
              variant="primary"
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

import { FC } from 'react';

import styles from './layout.module.scss';
import { Props } from './layout.types';

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
              ariaLabel={labels.close}
              title={labels.close}
              onClick={onClose}
              styleType="ghost"
              size="xs"
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
              onClick={onCancel}
              styleType="ghost"
              size="sm"
            />
          </li>
          <li>
            <Button
              label={labels.submit}
              onClick={onSubmit}
              styleType="primary"
              size="sm"
            />
          </li>
        </ul>
      </footer>
    </div>
  );
};

export { Layout };

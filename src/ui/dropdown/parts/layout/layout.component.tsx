import { FC } from 'react';

import styles from './layout.module.scss';

import { Button } from 'ui/button/button.component';
import { IconName } from 'ui/icon/icon.types';

interface Props {
  id: string;
  title?: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const Layout: FC<Props> = ({
  id,
  title = '',
  onSubmit,
  onCancel,
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
              ariaLabel="close"
              title="close"
              onClick={onCancel}
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
              label="Close"
              onClick={onCancel}
              styleType="ghost"
              size="sm"
            />
          </li>
          <li>
            <Button
              label="Save"
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

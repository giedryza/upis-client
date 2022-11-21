import { FC, PropsWithChildren, useRef } from 'react';
import { AriaDialogProps, useDialog } from 'react-aria';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';

import { Props } from './content.types';
import styles from './content.module.scss';

export const Content: FC<PropsWithChildren<Props & AriaDialogProps>> = ({
  title,
  onClose,
  children,
  ...ariaDialogProps
}) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);

  const { dialogProps, titleProps } = useDialog(ariaDialogProps, dialogRef);

  return (
    <div {...dialogProps} ref={dialogRef} className={styles.content}>
      <header className={styles.header}>
        <h3 {...titleProps} className={styles.title}>
          {title}
        </h3>
        {!!onClose && (
          <Button
            icon="close"
            variant="ghost"
            size="sm"
            attributes={{
              onClick: onClose,
              'aria-label': t('common:actions.close'),
            }}
          />
        )}
      </header>

      <div className={styles.body}>{children}</div>
    </div>
  );
};

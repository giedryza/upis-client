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
  actions = [],
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
            as="button"
            icon="close"
            variant="ghost"
            size="xs"
            onClick={onClose}
            aria-label={t('common:actions.close')}
          />
        )}
      </header>

      <div className={styles.body}>{children}</div>

      {!!actions.length && (
        <ul className={styles.footer}>
          {actions.map(({ closable, ...action }, i) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              onClick={() => {
                if (closable && onClose) onClose();
              }}
              key={i}
            >
              <Button {...action} size="xs" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

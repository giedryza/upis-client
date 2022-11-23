import { useRef, FC, PropsWithChildren } from 'react';
import {
  FocusScope,
  mergeProps,
  OverlayContainer,
  OverlayProvider,
  useDialog,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';

import { ModalContent } from './atoms';
import { ModalComposition, Props } from './modal.types';
import styles from './modal.module.scss';

export const Modal: FC<PropsWithChildren<Props>> & ModalComposition = ({
  id,
  isOpen,
  onClose,
  children,
}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      isDismissable: true,
    },
    ref
  );
  const { modalProps } = useModal();
  const { dialogProps } = useDialog(
    {
      id,
      role: 'dialog',
    },
    ref
  );

  usePreventScroll();

  return (
    <OverlayContainer>
      <div className={styles.modal} {...underlayProps}>
        <FocusScope contain restoreFocus autoFocus={false}>
          <div
            {...mergeProps(overlayProps, dialogProps, modalProps, { ref })}
            className={styles.box}
          >
            <div className={styles.header}>
              <Button
                icon="close"
                variant="ghost"
                attributes={{
                  onClick: onClose,
                  'aria-label': t('common:actions.close'),
                }}
              />
            </div>

            <div>{children}</div>
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
};

Modal.Provider = OverlayProvider;
Modal.Content = ModalContent;

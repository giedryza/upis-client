import { FC, PropsWithChildren, useRef } from 'react';
import { DismissButton, FocusScope, usePopover } from 'react-aria';
import { clsx } from 'clsx';

import { Props } from './popover.types';
import styles from './popover.module.scss';

export const Popover: FC<PropsWithChildren<Props>> = ({
  children,
  state,
  triggerRef,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { popoverProps, arrowProps, placement } = usePopover(
    {
      triggerRef,
      popoverRef,
      offset: 10,
      containerPadding: 10,
      isNonModal: true,
    },
    state
  );

  return (
    <FocusScope contain restoreFocus autoFocus={false}>
      <div
        {...popoverProps}
        ref={popoverRef}
        className={clsx(styles.popover, 'scrollbar-hidden')}
      >
        <svg
          {...arrowProps}
          className={styles.arrow}
          data-placement={placement}
          viewBox="0 0 12 12"
        >
          <path d="M0 0,L6 6,L12 0" />
        </svg>
        <DismissButton onDismiss={state.close} />
        {children}
      </div>
    </FocusScope>
  );
};

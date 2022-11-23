import { FC, PropsWithChildren, useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

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
      containerPadding: 0,
    },
    state
  );

  return (
    <Overlay>
      <div {...popoverProps} ref={popoverRef} className={styles.popover}>
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
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

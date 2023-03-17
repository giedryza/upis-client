import { FC, PropsWithChildren, useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { Props } from './popover.types';
import styles from './popover.module.scss';

export const Popover: FC<PropsWithChildren<Props>> = ({
  children,
  state,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverProps, underlayProps } = usePopover(
    { ...props, popoverRef: ref },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className={styles.underlay} />
      <div {...popoverProps} style={popoverProps.style} ref={ref}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

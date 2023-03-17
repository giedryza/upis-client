import { FC, PropsWithChildren, useRef } from 'react';
import { DismissButton, FocusScope, usePopover } from 'react-aria';

import { Props } from './popover.types';

export const Popover: FC<PropsWithChildren<Props>> = ({
  children,
  state,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
      offset: 5,
      containerPadding: 5,
      isNonModal: true,
    },
    state
  );

  return (
    <FocusScope contain restoreFocus autoFocus={false}>
      <div {...popoverProps} style={popoverProps.style} ref={ref}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  );
};

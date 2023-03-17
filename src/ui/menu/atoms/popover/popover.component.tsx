import { FC, PropsWithChildren, useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { Props } from './popover.types';

export const Popover: FC<PropsWithChildren<Props>> = ({
  children,
  state,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverProps } = usePopover({ ...props, popoverRef: ref }, state);

  return (
    <Overlay>
      <div {...popoverProps} style={popoverProps.style} ref={ref}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

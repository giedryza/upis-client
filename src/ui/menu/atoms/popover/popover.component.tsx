import { FC, PropsWithChildren, useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { useEventListener } from 'tools/hooks';

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

  useEventListener('scroll', state.close);

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

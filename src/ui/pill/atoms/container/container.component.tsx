import { FC, useRef, cloneElement } from 'react';
import { useOverlayTriggerState } from 'react-stately';
import { useOverlayTrigger } from 'react-aria';

import { Trigger, Popover } from '..';

import { Props } from './container.types';

export const Container: FC<Props> = ({ label, active, children }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const state = useOverlayTriggerState({});
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
    triggerRef
  );

  return (
    <>
      <Trigger
        {...triggerProps}
        label={label}
        active={active}
        isOpen={state.isOpen}
        buttonRef={triggerRef}
      />

      {!!state.isOpen && (
        <Popover triggerRef={triggerRef} state={state}>
          {cloneElement(children, {
            ...overlayProps,
            role: 'dialog',
            onClose: state.close,
          })}
        </Popover>
      )}
    </>
  );
};

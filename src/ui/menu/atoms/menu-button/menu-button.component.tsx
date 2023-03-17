/* eslint-disable react/destructuring-assignment */
import { useRef } from 'react';
import {
  mergeProps,
  useButton,
  useFocusRing,
  useMenuTrigger,
} from 'react-aria';
import { useMenuTriggerState } from 'react-stately';

import { MenuDropdown, Popover } from '..';

import { Props } from './menu-button.types';

export const MenuButton = <T extends object>(props: Props<T>) => {
  const ref = useRef<HTMLButtonElement>(null);

  const state = useMenuTriggerState(props);
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);
  const { buttonProps } = useButton(menuTriggerProps, ref);
  const { focusProps, isFocusVisible: _isFocusVisible } = useFocusRing();

  return (
    <>
      <button {...mergeProps(buttonProps, focusProps)} type="button" ref={ref}>
        {props.label ? props.label : null}
      </button>

      {state.isOpen ? (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <MenuDropdown {...props} {...menuProps} />
        </Popover>
      ) : null}
    </>
  );
};

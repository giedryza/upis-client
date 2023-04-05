import { useRef } from 'react';
import {
  mergeProps,
  useButton,
  useFocusRing,
  useMenuTrigger,
} from 'react-aria';
import { useMenuTriggerState } from 'react-stately';
import { clsx } from 'clsx';

import { Icon } from 'ui/icon';

import { MenuDropdown, Popover } from '..';

import { Props } from './menu-button.types';
import styles from './menu-button.module.scss';

export const MenuButton = <T extends object>({
  label,
  icon,
  size = 'md',
  ...props
}: Props<T>) => {
  const ref = useRef<HTMLButtonElement>(null);

  const state = useMenuTriggerState(props);
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

  const { buttonProps } = useButton(mergeProps(props, menuTriggerProps), ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <>
      <button
        {...mergeProps(buttonProps, focusProps)}
        // prevent weird react-aria behaviour when page gets scrolled down when opening menu with a keyboard
        onKeyDown={undefined}
        className={clsx(
          styles.button,
          isFocusVisible && styles['-focus'],
          styles[`-size-${size}`]
        )}
        type="button"
        ref={ref}
      >
        {icon ? <Icon name={icon} className={styles.icon} /> : null}
        {label ? <span>{label}</span> : null}
        <Icon
          name={state.isOpen ? 'chevron-up' : 'chevron-down'}
          className={styles.chevron}
        />
      </button>

      {state.isOpen ? (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <MenuDropdown {...props} {...menuProps} />
        </Popover>
      ) : null}
    </>
  );
};

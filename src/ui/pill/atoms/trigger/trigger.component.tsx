import { FC } from 'react';
import { clsx } from 'clsx';
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from 'react-aria';

import { Icon } from 'ui/icon';

import { Props } from './trigger.types';
import styles from './trigger.module.scss';

export const Trigger: FC<Props & AriaButtonProps<'button'>> = ({
  label,
  isOpen,
  buttonRef,
  ...rest
}) => {
  const { buttonProps } = useButton({ children: label, ...rest }, buttonRef);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <button
      {...buttonProps}
      {...mergeProps(buttonProps, focusProps)}
      className={clsx(styles.trigger, isFocusVisible && styles['-focus'])}
      type="button"
      ref={buttonRef}
    >
      <span>{label}</span>
      <Icon
        name={isOpen ? 'chevron-up' : 'chevron-down'}
        className={styles.icon}
      />
    </button>
  );
};

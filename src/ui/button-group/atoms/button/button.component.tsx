/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import {
  mergeProps,
  useFocusRing,
  useRadio,
  useVisuallyHidden,
} from 'react-aria';
import { useObjectRef } from '@react-aria/utils';

import { Icon } from 'ui';

import { useButtonGroupContext } from '../../button-group.context';

import { Props } from './button.types';
import styles from './button.module.scss';

export const Button = forwardRef<HTMLInputElement, Props>(
  ({ label, value, disabled, icon }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);
    const state = useButtonGroupContext();

    const { inputProps } = useRadio(
      {
        children: label,
        value,
        isDisabled: disabled,
      },
      state,
      ref
    );
    const { visuallyHiddenProps } = useVisuallyHidden();
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <label
        className={clsx(styles.button, {
          [String(styles.selected)]: state.selectedValue === value,
          [String(styles.focus)]: isFocusVisible,
          [String(styles.disabled)]: state.isDisabled || disabled,
        })}
      >
        <input
          {...mergeProps(visuallyHiddenProps, inputProps, focusProps, { ref })}
        />

        {icon ? <Icon name={icon} className={styles.icon} /> : null}

        <span className={styles.label}>{label}</span>
      </label>
    );
  }
);

Button.displayName = 'Button';

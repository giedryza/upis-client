/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import {
  mergeProps,
  useCheckboxGroupItem,
  useFocusRing,
  useVisuallyHidden,
} from 'react-aria';
import { useObjectRef } from '@react-aria/utils';

import { useCheckboxContext } from '../../checkbox-group-input.context';

import { Props } from './checkbox.types';
import styles from './checkbox.module.scss';

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, value, error, disabled, readonly }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);
    const state = useCheckboxContext();

    const { inputProps } = useCheckboxGroupItem(
      {
        children: label,
        value,
        name: value,
        isDisabled: disabled,
        isReadOnly: readonly,
        validationState: error ? 'invalid' : 'valid',
      },
      state,
      ref
    );
    const { visuallyHiddenProps } = useVisuallyHidden();
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <label
        className={clsx(styles.checkbox, {
          [String(styles.selected)]: state.isSelected(value),
          [String(styles.focus)]: isFocusVisible,
          [String(styles.disabled)]: state.isDisabled || disabled,
          [String(styles.readonly)]: state.isReadOnly || readonly,
        })}
      >
        <input
          {...mergeProps(visuallyHiddenProps, inputProps, focusProps, { ref })}
        />

        <div className={styles.box} />

        <span className={styles.label}>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

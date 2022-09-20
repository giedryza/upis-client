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

import { useRadioContext } from '../../radio-input.context';

import { Props } from './radio.types';
import styles from './radio.module.scss';

export const Radio = forwardRef<HTMLInputElement, Props>(
  ({ label, value, disabled }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);
    const state = useRadioContext();

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
        className={clsx(styles.radio, {
          [String(styles.selected)]: state.selectedValue === value,
          [String(styles.focus)]: isFocusVisible,
          [String(styles.disabled)]: state.isDisabled || disabled,
          [String(styles.readonly)]: state.isReadOnly,
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

Radio.displayName = 'Radio';

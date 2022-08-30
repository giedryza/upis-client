/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef, VFC } from 'react';
import { useCheckbox, useFocusRing, useVisuallyHidden } from 'react-aria';
import { useToggleState } from 'react-stately';
import { useObjectRef, mergeProps } from '@react-aria/utils';
import { clsx } from 'clsx';

import { Props } from './checkbox-input.types';
import styles from './checkbox-input.module.scss';

export const CheckboxInput: VFC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ label, name, checked, onChange, disabled, readonly }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);

    const checkboxProps: Parameters<typeof useCheckbox>[0] = {
      children: label,
      name,
      isSelected: checked,
      onChange,
      isDisabled: disabled,
      isReadOnly: readonly,
    };

    const state = useToggleState(checkboxProps);
    const { inputProps } = useCheckbox(checkboxProps, state, ref);
    const { visuallyHiddenProps } = useVisuallyHidden();
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <label
        className={clsx(styles.checkbox, {
          [`${styles.selected}`]: state.isSelected,
          [`${styles.focus}`]: isFocusVisible,
          [`${styles.disabled}`]: disabled,
          [`${styles.readonly}`]: readonly,
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

CheckboxInput.displayName = 'CheckboxInput';

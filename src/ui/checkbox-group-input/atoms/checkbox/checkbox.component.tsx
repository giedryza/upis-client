/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useRef } from 'react';
import clsx from 'clsx';
import {
  mergeProps,
  useCheckboxGroupItem,
  useFocusRing,
  useVisuallyHidden,
} from 'react-aria';

import { useCheckboxContext } from '../../checkbox-group-input.context';

import { Props } from './checkbox.types';
import styles from './checkbox.module.scss';

export const Checkbox: FC<Props> = ({
  children,
  value,
  disabled,
  readonly,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const state = useCheckboxContext();

  const { inputProps } = useCheckboxGroupItem(
    {
      children,
      value,
      name: value,
      isDisabled: disabled,
      isReadOnly: readonly,
    },
    state,
    ref
  );
  const { visuallyHiddenProps } = useVisuallyHidden();
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <label
      className={clsx(styles.checkbox, {
        [`${styles.selected}`]: state.isSelected(value),
        [`${styles.focus}`]: isFocusVisible,
        [`${styles.disabled}`]: state.isDisabled || disabled,
        [`${styles.readonly}`]: state.isReadOnly || readonly,
      })}
    >
      <input
        {...mergeProps(visuallyHiddenProps, inputProps, focusProps, { ref })}
      />

      <div className={styles.box} />

      <span className={styles.label}>{children}</span>
    </label>
  );
};

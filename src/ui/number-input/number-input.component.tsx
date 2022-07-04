/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef, useRef } from 'react';
import { useButton, useLocale, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';
import { useObjectRef } from '@react-aria/utils';
import clsx from 'clsx';

import { Props } from './number-input.types';
import styles from './number-input.module.scss';

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      placeholder,
      name,
      value,
      onChange,
      disabled,
      readonly,
      min,
      max,
      step,
      error,
      info,
      autofocus,
      stepper = false,
      textAlign = 'left',
      formatOptions,
    },
    forwardedRef
  ) => {
    const incrementRef = useRef<HTMLButtonElement>(null);
    const decrementRef = useRef<HTMLButtonElement>(null);

    const inputRef = useObjectRef(forwardedRef);
    const { locale } = useLocale();

    const numberFieldProps: Parameters<typeof useNumberField>[0] = {
      label,
      placeholder,
      value,
      onChange,
      isDisabled: disabled,
      isReadOnly: readonly,
      minValue: min,
      maxValue: max,
      step,
      errorMessage: error,
      description: info,
      validationState: error ? 'invalid' : 'valid',
      autoFocus: autofocus,
      formatOptions,
    };
    const state = useNumberFieldState({
      ...numberFieldProps,
      locale,
    });

    const {
      labelProps,
      groupProps,
      inputProps,
      descriptionProps,
      errorMessageProps,
      incrementButtonProps,
      decrementButtonProps,
    } = useNumberField(numberFieldProps, state, inputRef);
    const { buttonProps: incrementProps } = useButton(
      incrementButtonProps,
      incrementRef
    );
    const { buttonProps: decrementProps } = useButton(
      decrementButtonProps,
      decrementRef
    );

    return (
      <div className={styles.container}>
        <label className={styles.label} {...labelProps}>
          {label}
        </label>

        <div className={styles.inputContainer} {...groupProps}>
          {stepper && (
            <button
              className={styles.stepper}
              {...decrementProps}
              type="button"
              ref={decrementRef}
            >
              -
            </button>
          )}
          <input
            className={clsx(styles.input, styles[`align-${textAlign}`])}
            {...inputProps}
            name={name}
            ref={inputRef}
          />
          {stepper && (
            <button
              className={styles.stepper}
              {...incrementProps}
              type="button"
              ref={incrementRef}
            >
              +
            </button>
          )}
        </div>

        {info && (
          <small {...descriptionProps} data-help="info">
            {info}
          </small>
        )}
        {error && (
          <small {...errorMessageProps} data-help="error">
            {error}
          </small>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

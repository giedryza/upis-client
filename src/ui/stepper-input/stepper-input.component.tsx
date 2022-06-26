/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, VFC } from 'react';
import { useButton, useLocale, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';

import { Props } from './stepper-input.types';
import styles from './stepper-input.module.scss';

export const StepperInput: VFC<Props> = ({
  label,
  placeholder,
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
  formatOptions,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const incrementRef = useRef<HTMLButtonElement>(null);
  const decrementRef = useRef<HTMLButtonElement>(null);

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
    <div>
      <label {...labelProps}>{label}</label>
      <div {...groupProps}>
        <button {...decrementProps} type="button" ref={decrementRef}>
          -
        </button>
        <input {...inputProps} ref={inputRef} />
        <button {...incrementProps} type="button" ref={incrementRef}>
          +
        </button>
      </div>
    </div>
  );
};

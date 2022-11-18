import { forwardRef, RefObject } from 'react';
import { useTextField, mergeProps } from 'react-aria';
import { useObjectRef } from '@react-aria/utils';

import styles from './text-input.module.scss';
import { Props, InputElement } from './text-input.types';

export const TextInput = forwardRef<InputElement, Props>(
  (
    {
      name,
      type = 'text',
      inputmode,
      disabled,
      readonly,
      value,
      onChange,
      error,
      info,
      label,
      placeholder,
      rows,
      autofocus,
    },
    forwardedRef
  ) => {
    const ref = useObjectRef(forwardedRef);

    const { labelProps, inputProps, descriptionProps, errorMessageProps } =
      useTextField<'input' | 'textarea'>(
        {
          inputElementType: type === 'textarea' ? 'textarea' : 'input',
          isDisabled: disabled,
          isReadOnly: readonly,
          description: info,
          errorMessage: error,
          autoFocus: autofocus,
          placeholder,
          value,
          label,
          name,
          type,
          inputMode: inputmode,
          validationState: error ? 'invalid' : 'valid',
          'aria-label': label,
        },
        ref
      );

    return (
      <div className={styles.input}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label {...labelProps}>{label}</label>

        {type === 'textarea' ? (
          <textarea
            {...mergeProps(
              inputProps,
              { onChange },
              {
                rows,
                ref: ref as RefObject<HTMLTextAreaElement>,
              }
            )}
          />
        ) : (
          <input
            {...mergeProps(
              inputProps,
              { onChange },
              {
                ref: ref as RefObject<HTMLInputElement>,
              }
            )}
          />
        )}

        {info ? (
          <small {...descriptionProps} data-help="info">
            {info}
          </small>
        ) : null}
        {error ? (
          <small {...errorMessageProps} data-help="error">
            {error}
          </small>
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

import {
  forwardRef,
  ChangeEvent,
  FocusEvent,
  AllHTMLAttributes,
  RefObject,
} from 'react';

import styles from './input.module.scss';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

export interface Props {
  name: string;
  type?:
    | 'text'
    | 'textarea'
    | 'number'
    | 'email'
    | 'password'
    | 'date'
    | 'file';
  inputmode?: JSX.IntrinsicElements['input']['inputMode'];
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<InputElement>) => void;
  onFocus?: (e: FocusEvent<InputElement>) => void;
  onBlur?: (e: FocusEvent<InputElement>) => void;
  error?: string;
  info?: string;
  label?: string;
  placeholder?: string;
}

const Input = forwardRef<InputElement, Props>(
  (
    {
      name,
      type = 'text',
      inputmode = 'text',
      disabled,
      readonly,
      value,
      onChange,
      onFocus,
      onBlur,
      error,
      info,
      label,
      placeholder,
    },
    ref
  ) => {
    const withInfo = !!(error || info);

    const attributes: AllHTMLAttributes<InputElement> = {
      name,
      id: name,
      placeholder,
      disabled,
      readOnly: readonly,
      inputMode: inputmode,
      value,
      onChange,
      onFocus,
      onBlur,
      'aria-invalid': !!error,
      ...(withInfo ? { 'aria-describedby': 'info' } : {}),
    };

    return (
      <div className={styles.input}>
        {label && <label htmlFor={name}>{label}</label>}

        {type === 'textarea' ? (
          <textarea
            {...attributes}
            ref={ref as RefObject<HTMLTextAreaElement>}
          />
        ) : (
          <input
            type={type}
            {...attributes}
            ref={ref as RefObject<HTMLInputElement>}
          />
        )}

        {withInfo && <small id="info">{error || info}</small>}
      </div>
    );
  }
);

export { Input };

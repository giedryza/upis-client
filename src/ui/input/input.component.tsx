/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, ChangeEvent, AllHTMLAttributes } from 'react';

import styles from './input.module.scss';

interface Props {
  name: string;
  type?: 'text' | 'textarea' | 'email' | 'number' | 'date' | 'file';
  inputmode?: JSX.IntrinsicElements['input']['inputMode'];
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  info?: string;
  label?: string;
  placeholder?: string;
}

const Input: FC<Props> = ({
  name,
  type = 'text',
  inputmode = 'text',
  disabled,
  readonly,
  value,
  onChange,
  error,
  info,
  label,
  placeholder,
}) => {
  const attributes: AllHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
  > = {
    name,
    placeholder,
    disabled,
    readOnly: readonly,
    inputMode: inputmode,
    value,
    onChange,
    'aria-describedby': 'info',
    'aria-invalid': !!error,
  };

  return (
    <div className={styles.input}>
      {label && <label htmlFor={name}>{label}</label>}
      {type === 'textarea' ? (
        <textarea {...attributes} />
      ) : (
        <input type={type} {...attributes} />
      )}
      {(error || info) && <small id="info">{error || info}</small>}
    </div>
  );
};

export { Input };

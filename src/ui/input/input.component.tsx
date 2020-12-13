/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, ChangeEvent, AllHTMLAttributes } from 'react';

import styles from './input.module.scss';

interface Props {
  id: string;
  type?: 'text' | 'textarea' | 'email' | 'number' | 'date' | 'file';
  inputmode?: JSX.IntrinsicElements['input']['inputMode'];
  disabled?: boolean;
  readonly?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: FC<Props> = ({
  id,
  type = 'text',
  inputmode = 'text',
  disabled,
  readonly,
  value,
  onChange,
}) => {
  const attributes: AllHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
  > = {
    id,
    readOnly: readonly,
    disabled,
    inputMode: inputmode,
    value,
    onChange,
  };

  return (
    <div className={styles.input}>
      <label htmlFor={id}>Text Input</label>
      {type === 'textarea' ? (
        <textarea {...attributes} />
      ) : (
        <input type={type} {...attributes} />
      )}
    </div>
  );
};

export { Input };

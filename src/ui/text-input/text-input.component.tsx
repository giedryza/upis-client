import { forwardRef, AllHTMLAttributes, RefObject } from 'react';

import styles from './text-input.module.scss';
import { Props, InputElement } from './text-input.types';

const TextInput = forwardRef<InputElement, Props>(
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
      rows,
    },
    ref
  ) => {
    const withInfo = !!(error || info);
    const infoId = `info-${name}`;

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
      ...(withInfo ? { 'aria-describedby': infoId } : {}),
    };

    return (
      <div className={styles.input}>
        {label && <label htmlFor={name}>{label}</label>}

        {type === 'textarea' ? (
          <textarea
            rows={rows}
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

        {withInfo && <small id={infoId}>{error || info}</small>}
      </div>
    );
  }
);

export { TextInput };

import { forwardRef, AllHTMLAttributes } from 'react';

import styles from './select-input.module.scss';
import { Props } from './select-input.types';

export const SelectInput = forwardRef<HTMLSelectElement, Props>(
  (
    {
      name,
      disabled,
      readonly,
      multiple,
      value,
      options,
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
    const infoId = `info-${name}`;

    const attributes: AllHTMLAttributes<HTMLSelectElement> = {
      name,
      id: name,
      value,
      onChange,
      onFocus,
      onBlur,
      disabled,
      multiple,
      readOnly: readonly,
      'aria-invalid': !!error,
      ...(withInfo ? { 'aria-describedby': infoId } : {}),
      ...(readonly ? { tabIndex: -1 } : {}),
    };

    return (
      <div className={styles.select}>
        {label && <label htmlFor={name}>{label}</label>}

        <select {...attributes} ref={ref}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {withInfo && <small id={infoId}>{error || info}</small>}
      </div>
    );
  }
);

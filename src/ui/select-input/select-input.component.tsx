import { forwardRef, AllHTMLAttributes } from 'react';

import styles from './select-input.module.scss';
import { Props } from './select-input.types';

export const SelectInput = forwardRef<HTMLSelectElement, Props>(
  (
    {
      options,
      label,
      ariaLabel,
      name,
      disabled,
      readonly,
      value,
      onChange,
      error,
      info,
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
      disabled,
      readOnly: readonly,
      'aria-invalid': !!error,
      'aria-label': ariaLabel,
      ...(withInfo ? { 'aria-describedby': infoId } : {}),
      ...(readonly ? { tabIndex: -1 } : {}),
    };

    return (
      <div className={styles.select}>
        {label ? <label htmlFor={name}>{label}</label> : null}

        <select {...attributes} ref={ref}>
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}

          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {withInfo ? <small id={infoId}>{error || info}</small> : null}
      </div>
    );
  }
);

SelectInput.displayName = 'SelectInput';

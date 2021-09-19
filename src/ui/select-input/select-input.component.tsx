import { forwardRef, AllHTMLAttributes, ChangeEvent, FocusEvent } from 'react';

import styles from './select-input.module.scss';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface Props {
  name: string;
  options: DropdownOption[];
  value?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  info?: string;
}

const SelectInput = forwardRef<HTMLSelectElement, Props>(
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
          {placeholder && <option value="">{placeholder}</option>}

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

export { SelectInput };

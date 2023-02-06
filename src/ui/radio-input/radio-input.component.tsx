import { forwardRef } from 'react';

import { Props } from './radio-input.types';
import { Radio, Group } from './atoms';

export const RadioInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      items,
      value,
      onChange,
      info,
      error,
      disabled,
      readonly,
      variant,
    },
    forwardedRef
  ) => {
    return (
      <Group
        label={label}
        name={name}
        onChange={onChange}
        value={value}
        info={info}
        error={error}
        disabled={disabled}
        readonly={readonly}
      >
        {items.map((item) => (
          <Radio
            {...item}
            variant={variant}
            ref={forwardedRef}
            key={item.value}
          />
        ))}
      </Group>
    );
  }
);

RadioInput.displayName = 'RadioInput';

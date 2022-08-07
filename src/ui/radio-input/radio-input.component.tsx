import { forwardRef } from 'react';

import { Props } from './radio-input.types';
import { Radio, Group } from './atoms';

export const RadioInput = forwardRef<HTMLInputElement, Props>(
  (
    { label, name, items, value, onChange, error, disabled, readonly },
    forwardedRef
  ) => {
    return (
      <Group
        label={label}
        name={name}
        onChange={onChange}
        value={value}
        error={error}
        disabled={disabled}
        readonly={readonly}
      >
        {items.map((item) => (
          <Radio {...item} ref={forwardedRef} key={item.value} />
        ))}
      </Group>
    );
  }
);

RadioInput.displayName = 'RadioInput';

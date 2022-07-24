import { forwardRef } from 'react';

import { Props } from './checkbox-group-input.types';
import { Checkbox, Group } from './atoms';

export const CheckboxGroupInput = forwardRef<HTMLInputElement, Props>(
  (
    { label, items, value, onChange, error, disabled, readonly },
    forwardedRef
  ) => {
    return (
      <Group
        label={label}
        onChange={onChange}
        value={value}
        error={error}
        disabled={disabled}
        readonly={readonly}
      >
        {items.map((item) => (
          <Checkbox
            {...item}
            error={!!error}
            ref={forwardedRef}
            key={item.value}
          >
            {item.label}
          </Checkbox>
        ))}
      </Group>
    );
  }
);

CheckboxGroupInput.displayName = 'CheckboxGroupInput';

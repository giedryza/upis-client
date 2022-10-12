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
          <Checkbox {...item} ref={forwardedRef} key={item.value} />
        ))}
      </Group>
    );
  }
);

CheckboxGroupInput.displayName = 'CheckboxGroupInput';

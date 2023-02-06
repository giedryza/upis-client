import { forwardRef } from 'react';

import { Props } from './checkbox-group-input.types';
import { Checkbox, Group } from './atoms';

export const CheckboxGroupInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      ariaLabel,
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
        ariaLabel={ariaLabel}
        onChange={onChange}
        value={value}
        info={info}
        error={error}
        disabled={disabled}
        readonly={readonly}
      >
        {items.map((item) => (
          <Checkbox
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

CheckboxGroupInput.displayName = 'CheckboxGroupInput';

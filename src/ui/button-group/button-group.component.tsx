import { forwardRef } from 'react';

import { Props } from './button-group.types';
import { Button, Group } from './atoms';

export const ButtonGroup = forwardRef<HTMLInputElement, Props>(
  (
    { label, ariaLabel, name, items, value, onChange, info, error, disabled },
    forwardedRef
  ) => {
    return (
      <Group
        label={label}
        ariaLabel={ariaLabel}
        name={name}
        onChange={onChange}
        value={value}
        info={info}
        error={error}
        disabled={disabled}
      >
        {items.map((item) => (
          <Button {...item} ref={forwardedRef} key={item.value} />
        ))}
      </Group>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

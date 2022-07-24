import React, { VFC } from 'react';

import { Props } from './checkbox-group-input.types';
import { Checkbox, CheckboxGroup } from './atoms';

export const CheckboxGroupInput: VFC<Props> = ({
  label,
  items,
  value,
  onChange,
  disabled,
  readonly,
}) => {
  return (
    <CheckboxGroup
      label={label}
      onChange={onChange}
      value={value}
      disabled={disabled}
      readonly={readonly}
    >
      {items.map((item) => (
        <Checkbox key={item.value} {...item}>
          {item.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

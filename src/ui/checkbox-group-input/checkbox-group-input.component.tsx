import { VFC } from 'react';

import { Props } from './checkbox-group-input.types';
import { Checkbox, Group } from './atoms';

export const CheckboxGroupInput: VFC<Props> = ({
  label,
  items,
  value,
  onChange,
  disabled,
  readonly,
}) => {
  return (
    <Group
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
    </Group>
  );
};

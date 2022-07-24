import { VFC } from 'react';

import { Props } from './checkbox-group-input.types';
import { Checkbox, Group } from './atoms';

export const CheckboxGroupInput: VFC<Props> = ({
  label,
  items,
  value,
  onChange,
  error,
  disabled,
  readonly,
}) => {
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
        <Checkbox {...item} error={!!error} key={item.value}>
          {item.label}
        </Checkbox>
      ))}
    </Group>
  );
};

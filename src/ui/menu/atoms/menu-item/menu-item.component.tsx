import { useRef } from 'react';
import { useMenuItem } from 'react-aria';

import { Props } from './menu-item.types';

export const MenuItem = <T extends object>({ item, state }: Props<T>) => {
  const ref = useRef<HTMLLIElement>(null);
  const { menuItemProps, isFocused, isDisabled } = useMenuItem(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...menuItemProps}
      ref={ref}
      style={{
        background: isFocused ? 'gray' : 'transparent',
        color: isDisabled ? 'gray' : isFocused ? 'white' : 'black',
        outline: 'none',
        cursor: 'default',
      }}
    >
      {item.rendered}
    </li>
  );
};

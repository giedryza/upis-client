import { useRef } from 'react';
import { AriaMenuProps, useMenu } from 'react-aria';
import { useTreeState } from 'react-stately';
import type { Node } from '@react-types/shared';

import { MenuSection, MenuItem } from '..';
import { Item } from '../../menu.types';

import styles from './menu-dropdown.module.scss';

export const MenuDropdown = <T extends object>(props: AriaMenuProps<T>) => {
  const ref = useRef<HTMLUListElement>(null);

  const state = useTreeState(props);
  const { menuProps } = useMenu(props, state, ref);

  return (
    <ul {...menuProps} className={styles.dropdown} ref={ref}>
      {[...state.collection].map((item) =>
        item.type === 'section' ? (
          <MenuSection key={item.key} section={item} state={state} />
        ) : (
          <MenuItem key={item.key} item={item as Node<Item>} state={state} />
        )
      )}
    </ul>
  );
};

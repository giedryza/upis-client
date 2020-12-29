import { FC } from 'react';

import styles from './list.module.scss';

import { Button, Props as ButtonProps } from 'ui/button/button.component';
import { DropdownKey } from 'domain/dropdown/dropdown.types';

interface MenuItem {
  label: string;
  icon?: ButtonProps['icon'];
  url?: ButtonProps['url'];
  target?: ButtonProps['target'];
  onClick?: ButtonProps['onClick'];
}

interface Props {
  id: DropdownKey;
  items?: MenuItem[];
}

const List: FC<Props> = ({ id, items = [] }) => {
  return items.length ? (
    <ul className={styles.list} role="menu" aria-labelledby={id}>
      {items.map((item) => (
        <li role="none" key={item.label}>
          <Button
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            url={item.url}
            target={item.target}
            styleType="ghost"
            textAlign="left"
            size="sm"
            block
            role="menuitem"
          />
        </li>
      ))}
    </ul>
  ) : null;
};

export { List };

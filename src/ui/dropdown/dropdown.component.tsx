import { FC, useState } from 'react';
import classnames from 'classnames';

import styles from './dropdown.module.scss';

import { Button, Props as ButtonProps } from 'ui/button/button.component';

type MenuButton = Pick<
  ButtonProps,
  | 'label'
  | 'title'
  | 'icon'
  | 'iconPlacement'
  | 'styleType'
  | 'size'
  | 'block'
  | 'ariaLabel'
>;

type MenuItem = {
  label: string;
  icon?: ButtonProps['icon'];
  url?: ButtonProps['url'];
  target?: ButtonProps['target'];
  onClick?: ButtonProps['onClick'];
};

interface Props {
  menuButton: MenuButton;
  items?: MenuItem[];
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
}

const Dropdown: FC<Props> = ({
  menuButton,
  position = 'bottom-left',
  items = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onMenuClick = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const menuButtonId = menuButton.label || menuButton.ariaLabel;

  return (
    <div className={styles.container}>
      <Button
        onClick={onMenuClick}
        ariaHasPopup={!!items.length}
        ariaExpanded={isOpen}
        id={menuButtonId}
        {...menuButton}
      />
      {!!items.length && (
        <ul
          className={classnames(styles[position])}
          role="menu"
          aria-labelledby={menuButtonId}
        >
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
      )}
    </div>
  );
};

export { Dropdown };

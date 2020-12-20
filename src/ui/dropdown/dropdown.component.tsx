import { FC, KeyboardEvent, useCallback, useRef, useState } from 'react';
import classnames from 'classnames';

import styles from './dropdown.module.scss';

import { Button, Props as ButtonProps } from 'ui/button/button.component';
import { useOnClickOutside } from 'utils/hooks/use-on-click-outside';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const menuButtonId = menuButton.label || menuButton.ariaLabel;

  const onMenuClick = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  const onClickOutside = useCallback(() => setIsOpen(false), []);

  useOnClickOutside(containerRef, onClickOutside);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={onKeyDown} className={styles.container} ref={containerRef}>
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

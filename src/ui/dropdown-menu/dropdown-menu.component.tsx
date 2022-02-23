import { useRef, useState, VFC, KeyboardEvent } from 'react';
import { useId } from 'react-aria';
import clsx from 'clsx';

import { useOnClickOutside } from 'tools/hooks';
import { Button } from 'ui/button';

import { Props } from './dropdown-menu.types';
import styles from './dropdown-menu.module.scss';

export const DropdownMenu: VFC<Props> = ({
  menuButton,
  position = 'bottom-left',
  items = [],
}) => {
  const menuId = useId();
  const buttonId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  useOnClickOutside(containerRef, handleClose);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={onKeyDown} className={styles.container} ref={containerRef}>
      <Button
        {...menuButton}
        attributes={{
          id: buttonId,
          'aria-haspopup': true,
          'aria-expanded': isOpen,
          'aria-controls': isOpen ? menuId : undefined,
          onClick: handleToggle,
        }}
      />
      <div className={clsx(styles.dropdown, styles[position])}>
        {items.length ? (
          <ul
            className={styles.list}
            id={menuId}
            role="menu"
            aria-labelledby={buttonId}
          >
            {items.map(({ onClick, ...rest }, i) => (
              <li role="none" key={i}>
                <Button
                  {...rest}
                  variant="ghost"
                  textAlign="left"
                  size="sm"
                  block
                  attributes={{
                    role: 'menuitem',
                    onClick: () => {
                      handleClose();
                      onClick?.();
                    },
                  }}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
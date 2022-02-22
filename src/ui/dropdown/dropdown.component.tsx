import { FC, useRef, KeyboardEvent } from 'react';
import clsx from 'clsx';

import { Button } from 'ui/button';
import { useOnClickOutside } from 'tools/hooks';

import styles from './dropdown.module.scss';
import { Props, MenuButton } from './dropdown.types';

export const Dropdown: FC<Props> = ({
  id,
  menuButton,
  position = 'bottom-left',
  isOpen,
  onOpen,
  onClose,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    isOpen ? onClose() : onOpen();
  };

  const handleClose = () => {
    if (isOpen) {
      onClose();
    }
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
          id,
          'aria-haspopup': true,
          'aria-expanded': isOpen,
          onClick: handleToggle,
        }}
      />
      <div className={clsx(styles.dropdown, styles[position])}>{children}</div>
    </div>
  );
};

export type { MenuButton };

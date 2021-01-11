import { FC, useRef, KeyboardEvent } from 'react';
import clsx from 'clsx';

import styles from './dropdown.module.scss';

import { Button, Props as ButtonProps } from 'ui/button/button.component';
import { useOnClickOutside } from 'utils/hooks/use-on-click-outside.hook';

export type MenuButton = Pick<
  ButtonProps,
  | 'label'
  | 'title'
  | 'icon'
  | 'iconPlacement'
  | 'styleType'
  | 'size'
  | 'block'
  | 'withDropdown'
  | 'ariaLabel'
>;

interface Props {
  id: string;
  menuButton: MenuButton;
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Dropdown: FC<Props> = ({
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
        onClick={handleToggle}
        ariaHasPopup
        ariaExpanded={isOpen}
        id={id}
        {...menuButton}
      />
      <div className={clsx(styles.dropdown, styles[position])}>{children}</div>
    </div>
  );
};

export { Dropdown };

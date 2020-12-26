import { FC, KeyboardEvent, useRef } from 'react';
import clsx from 'clsx';

import styles from './dropdown.module.scss';

import { Button, Props as ButtonProps } from 'ui/button/button.component';
import { useOnClickOutside } from 'utils/hooks/use-on-click-outside.hook';
import { DropdownKey } from 'state/dropdown/dropdown.types';
import { useDropdownContext } from 'state/dropdown/dropdown.context';
import { isDropdownActive } from 'state/dropdown/dropdown.selectors';

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

interface Props {
  id: DropdownKey;
  menuButton: MenuButton;
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
}

const Dropdown: FC<Props> = ({
  id,
  menuButton,
  position = 'bottom-left',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { dropdownState, dropdownActions } = useDropdownContext();

  const onButtonClick = () => {
    const payload = isDropdownActive(dropdownState, id) ? null : id;

    dropdownActions.setActiveDropdown(payload);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && isDropdownActive(dropdownState, id)) {
      dropdownActions.setActiveDropdown(null);
    }
  };

  const onClickOutside = () => {
    if (isDropdownActive(dropdownState, id)) {
      dropdownActions.setActiveDropdown(null);
    }
  };

  useOnClickOutside(containerRef, onClickOutside);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={onKeyDown} className={styles.container} ref={containerRef}>
      <Button
        onClick={onButtonClick}
        ariaHasPopup
        ariaExpanded={isDropdownActive(dropdownState, id)}
        id={id}
        {...menuButton}
      />
      <div className={clsx(styles.dropdown, styles[position])}>{children}</div>
    </div>
  );
};

export { Dropdown };

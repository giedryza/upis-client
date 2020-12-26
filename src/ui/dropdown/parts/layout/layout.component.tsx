import { FC } from 'react';

import styles from './layout.module.scss';

import { Button } from 'ui/button/button.component';
import { IconName } from 'ui/icon/icon.types';
import { DropdownKey } from 'state/dropdown/dropdown.types';
import { isDropdownActive } from 'state/dropdown/dropdown.selectors';
import { useDropdownContext } from 'state/dropdown/dropdown.context';

interface Props {
  id: DropdownKey;
  onSubmit: () => void;
  onCancel?: () => void;
}

const Layout: FC<Props> = ({ id, onSubmit, onCancel, children }) => {
  const { dropdownState, dropdownActions } = useDropdownContext();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }

    if (isDropdownActive(dropdownState, id)) {
      dropdownActions.setActiveDropdown(null);
    }
  };

  return (
    <div className={styles.container} aria-labelledby={id}>
      <header>
        <h2>Dialog title</h2>
        <ul>
          <li>
            <Button
              icon={IconName.Close}
              ariaLabel="close"
              title="close"
              onClick={handleCancel}
              styleType="ghost"
              size="xs"
            />
          </li>
        </ul>
      </header>
      <div>{children}</div>
      <footer>
        <ul>
          <li>
            <Button
              label="Close"
              onClick={handleCancel}
              styleType="ghost"
              size="sm"
            />
          </li>
          <li>
            <Button
              label="Save"
              onClick={onSubmit}
              styleType="primary"
              size="sm"
            />
          </li>
        </ul>
      </footer>
    </div>
  );
};

export { Layout };

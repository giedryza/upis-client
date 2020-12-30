import { FC } from 'react';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { isDropdownActive } from 'domain/dropdown/dropdown.selectors';
import { useDropdownContext } from 'domain/dropdown/dropdown.context';
import { Layout as LayoutComponent } from 'ui/dropdown/parts/layout/layout.component';

interface Props {
  id: DropdownKey;
  title?: string;
  onSubmit: () => void;
  onCancel?: () => void;
}

const Layout: FC<Props> = ({ id, title, onSubmit, onCancel, children }) => {
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
    <LayoutComponent
      id={id}
      title={title}
      onSubmit={onSubmit}
      onCancel={handleCancel}
    >
      {children}
    </LayoutComponent>
  );
};

export { Layout };
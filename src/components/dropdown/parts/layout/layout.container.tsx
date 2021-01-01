import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { isDropdownActive } from 'domain/dropdown/dropdown.selectors';
import { useDropdownContext } from 'domain/dropdown/dropdown.context';
import {
  Layout as LayoutComponent,
  Labels,
} from 'ui/dropdown/parts/layout/layout.component';

interface Props {
  id: DropdownKey;
  title?: string;
  labels?: Partial<Labels>;
  onSubmit: () => void;
  onCancel?: () => void;
}

const Layout: FC<Props> = ({
  id,
  title,
  labels = {},
  onSubmit,
  onCancel,
  children,
}) => {
  const { dropdownState, dropdownActions } = useDropdownContext();
  const { t } = useTranslation();

  const {
    submit = t('common:actions.submit'),
    cancel = t('common:actions.cancel'),
    close = t('common:actions.close'),
  } = labels;

  const handleClose = () => {
    if (isDropdownActive(dropdownState, id)) {
      dropdownActions.setActiveDropdown(null);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }

    handleClose();
  };

  return (
    <LayoutComponent
      id={id}
      title={title}
      labels={{ submit, cancel, close }}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      onClose={handleClose}
    >
      {children}
    </LayoutComponent>
  );
};

export { Layout };

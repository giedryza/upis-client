import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { isDropdownActive } from 'domain/dropdown/dropdown.selectors';
import { dropdownActions } from 'domain/dropdown/dropdown.actions';
import {
  Layout as LayoutComponent,
  Labels,
} from 'ui/dropdown/layout/layout.component';
import { State } from 'utils/libs/store/store.types';

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
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isOpen = useSelector((state: State) => isDropdownActive(state, id));

  const {
    submit = t('common:actions.submit'),
    cancel = t('common:actions.cancel'),
    close = t('common:actions.close'),
  } = labels;

  const handleClose = () => {
    if (isOpen) {
      dispatch(dropdownActions.setActiveDropdown(null));
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

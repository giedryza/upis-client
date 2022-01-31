import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import {
  ComponentProps,
  FormNameValues,
} from 'components/users/company/company-edit/form-name/form-name.types';
import { thunks } from 'domain/thunks';
import { TextInput } from 'ui/text-input/text-input.component';
import { IconName } from 'ui/icon';
import {
  useFormName,
  useValues,
} from 'components/users/company/company-edit/form-name/form-name.hooks';

export const FormName: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-company-name';

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const values = useValues();

  const onSubmit = ({ name }: FormNameValues) => {
    dispatch(thunks.companies.updateMyCompany(companyId, { name }));
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormName(
    onSubmit,
    values
  );

  const form = (
    <form id={formId} onSubmit={handleSubmit}>
      <TextInput
        {...refs.name}
        label={t('users:company.form.name.label')}
        error={errorMessages.name}
      />
    </form>
  );

  return (
    <EditInfo
      id={formId}
      label={t('users:company.form.name.label')}
      form={form}
      value={values.name}
      isValid={!isDisabled}
      icon={IconName.Kayak}
    />
  );
};

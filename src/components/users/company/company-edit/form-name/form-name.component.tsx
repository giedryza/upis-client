import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import {
  ComponentProps,
  FormNameValues,
} from 'components/users/company/company-edit/form-name/form-name.types';
import { TextInput } from 'ui/text-input/text-input.component';
import { IconName } from 'ui/icon';
import {
  useFormName,
  useValues,
} from 'components/users/company/company-edit/form-name/form-name.hooks';
import { useUpdateCompany } from 'domain/companies/companies.mutations';

export const FormName: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-company-name';

  const { t } = useTranslation();

  const values = useValues();

  const { mutate: updateCompany } = useUpdateCompany();

  const onSubmit = ({ name }: FormNameValues) => {
    updateCompany({ id: companyId, form: { name } });
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

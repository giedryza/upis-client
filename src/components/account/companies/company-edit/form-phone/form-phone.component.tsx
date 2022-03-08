import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import {
  ComponentProps,
  FormPhoneValues,
} from 'components/account/company/company-edit/form-phone/form-phone.types';
import { IconName, TextInput } from 'ui';
import {
  useFormPhone,
  useValues,
} from 'components/account/company/company-edit/form-phone/form-phone.hooks';
import { useUpdateCompany } from 'domain/companies/companies.mutations';

export const FormPhone: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-company-phone';

  const { t } = useTranslation();

  const values = useValues();
  const { mutate: updateCompany } = useUpdateCompany();

  const onSubmit = ({ phone }: FormPhoneValues) => {
    updateCompany({ id: companyId, form: { phone } });
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormPhone(
    onSubmit,
    values
  );

  const form = (
    <form id={formId} onSubmit={handleSubmit}>
      <TextInput
        {...refs.phone}
        label={t('account:company.form.phone.label')}
        error={errorMessages.phone}
      />
    </form>
  );

  return (
    <EditInfo
      id={formId}
      label={t('account:company.form.phone.label')}
      form={form}
      value={values.phone}
      isValid={!isDisabled}
      icon={IconName.Phone}
    />
  );
};

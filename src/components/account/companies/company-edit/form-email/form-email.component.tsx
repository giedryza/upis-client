import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import {
  ComponentProps,
  FormEmailValues,
} from 'components/account/company/company-edit/form-email/form-email.types';
import { IconName, TextInput } from 'ui';
import {
  useFormEmail,
  useValues,
} from 'components/account/company/company-edit/form-email/form-email.hooks';
import { useUpdateCompany } from 'domain/companies/companies.mutations';

export const FormEmail: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-company-email';

  const { t } = useTranslation();

  const values = useValues();

  const { mutate: updateCompany } = useUpdateCompany();

  const onSubmit = ({ email }: FormEmailValues) => {
    updateCompany({ id: companyId, form: { email } });
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormEmail(
    onSubmit,
    values
  );

  const form = (
    <form id={formId} onSubmit={handleSubmit}>
      <TextInput
        {...refs.email}
        label={t('account:company.form.email.label')}
        error={errorMessages.email}
      />
    </form>
  );

  return (
    <EditInfo
      id={formId}
      label={t('account:company.form.email.label')}
      form={form}
      value={values.email}
      isValid={!isDisabled}
      icon={IconName.Mail}
    />
  );
};

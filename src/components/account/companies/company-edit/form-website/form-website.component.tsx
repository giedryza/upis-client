import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import {
  ComponentProps,
  FormWebsiteValues,
} from 'components/account/company/company-edit/form-website/form-website.types';
import { IconName, TextInput } from 'ui';
import {
  useFormWebsite,
  useValues,
} from 'components/account/company/company-edit/form-website/form-website.hooks';
import { useUpdateCompany } from 'domain/companies/companies.mutations';

export const FormWebsite: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-company-website';

  const { t } = useTranslation();

  const values = useValues();

  const { mutate: updateCompany } = useUpdateCompany();

  const onSubmit = ({ website }: FormWebsiteValues) => {
    updateCompany({ id: companyId, form: { website } });
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormWebsite(
    onSubmit,
    values
  );

  const form = (
    <form id={formId} onSubmit={handleSubmit}>
      <TextInput
        {...refs.website}
        label={t('account:company.form.website.label')}
        error={errorMessages.website}
      />
    </form>
  );

  return (
    <EditInfo
      id={formId}
      label={t('account:company.form.website.label')}
      form={form}
      value={values.website}
      isValid={!isDisabled}
      icon={IconName.Globe}
    />
  );
};
import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import { IconName, TextInput } from 'ui';
import {
  ComponentProps,
  FormDescriptionValues,
} from 'components/account/company/company-edit/form-description/form-description.types';
import {
  useFormDescription,
  useValues,
} from 'components/account/company/company-edit/form-description/form-description.hooks';
import { useUpdateCompany } from 'domain/companies/companies.mutations';

export const FormDescription: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-company-description';

  const { t } = useTranslation();

  const values = useValues();

  const { mutate: updateCompany } = useUpdateCompany();

  const onSubmit = ({ description }: FormDescriptionValues) => {
    updateCompany({ id: companyId, form: { description } });
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormDescription(
    onSubmit,
    values
  );

  const form = (
    <form id={formId} onSubmit={handleSubmit}>
      <TextInput
        {...refs.description}
        label={t('account:company.form.description.label')}
        error={errorMessages.description}
        type="textarea"
        rows={10}
      />
    </form>
  );

  return (
    <EditInfo
      id={formId}
      label={t('account:company.form.description.label')}
      form={form}
      value={values.description}
      isValid={!isDisabled}
      icon={IconName.Info}
    />
  );
};
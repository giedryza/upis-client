import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import {
  ComponentProps,
  FormWebsiteValues,
} from 'components/users/company/company-edit/form-website/form-website.types';
import { thunks } from 'domain/thunks';
import { TextInput } from 'ui/text-input/text-input.component';
import { IconName } from 'ui/icon/icon.component';
import {
  useFormWebsite,
  useValues,
} from 'components/users/company/company-edit/form-website/form-website.hooks';

export const FormWebsite: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-company-website';

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const values = useValues();

  const onSubmit = ({ website }: FormWebsiteValues) => {
    dispatch(thunks.companies.updateMyCompany(companyId, { website }));
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormWebsite(
    onSubmit,
    values
  );

  const form = (
    <form id={formId} onSubmit={handleSubmit}>
      <TextInput
        {...refs.website}
        label={t('users:company.form.website.label')}
        error={errorMessages.website}
      />
    </form>
  );

  return (
    <EditInfo
      id={formId}
      label={t('users:company.form.website.label')}
      form={form}
      value={values.website}
      isValid={!isDisabled}
      icon={IconName.Globe}
    />
  );
};

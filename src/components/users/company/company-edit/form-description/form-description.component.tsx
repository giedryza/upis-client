import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import { thunks } from 'domain/thunks';
import { EditInfo } from 'components/editable-info/edit-info.component';
import { TextInput } from 'ui/text-input/text-input.component';
import { IconName } from 'ui/icon/icon.component';
import {
  ComponentProps,
  FormDescriptionValues,
} from 'components/users/company/company-edit/form-description/form-description.types';
import {
  useFormDescription,
  useValues,
} from 'components/users/company/company-edit/form-description/form-description.hooks';

export const FormDescription: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-company-description';

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const values = useValues();

  const onSubmit = ({ description }: FormDescriptionValues) => {
    dispatch(thunks.companies.updateMyCompany(companyId, { description }));
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormDescription(
    onSubmit,
    values
  );

  const form = (
    <form id={formId} onSubmit={handleSubmit}>
      <TextInput
        {...refs.description}
        label={t('users:company.form.description.label')}
        error={errorMessages.description}
        type="textarea"
        rows={10}
      />
    </form>
  );

  return (
    <EditInfo
      id={formId}
      label={t('users:company.form.description.label')}
      form={form}
      value={values.description}
      isValid={!isDisabled}
      icon={IconName.Info}
    />
  );
};

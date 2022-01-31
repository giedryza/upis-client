import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import {
  ComponentProps,
  FormPhoneValues,
} from 'components/users/company/company-edit/form-phone/form-phone.types';
import { thunks } from 'domain/thunks';
import { TextInput } from 'ui/text-input/text-input.component';
import { IconName } from 'ui/icon';
import {
  useFormPhone,
  useValues,
} from 'components/users/company/company-edit/form-phone/form-phone.hooks';

export const FormPhone: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-company-phone';

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const values = useValues();

  const onSubmit = ({ phone }: FormPhoneValues) => {
    dispatch(thunks.companies.updateMyCompany(companyId, { phone }));
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormPhone(
    onSubmit,
    values
  );

  const form = (
    <form id={formId} onSubmit={handleSubmit}>
      <TextInput
        {...refs.phone}
        label={t('users:company.form.phone.label')}
        error={errorMessages.phone}
      />
    </form>
  );

  return (
    <EditInfo
      id={formId}
      label={t('users:company.form.phone.label')}
      form={form}
      value={values.phone}
      isValid={!isDisabled}
      icon={IconName.Phone}
    />
  );
};

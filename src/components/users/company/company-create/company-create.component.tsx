import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { TextInput } from 'ui/text-input';
import { Button } from 'ui/button';
import {
  useCompanyCreateForm,
  useValues,
} from 'components/users/company/company-create/company-create.hooks';
import { CompanyCreateFormValues } from 'components/users/company/company-create/company-create.types';
import { useCreateCompany } from 'domain/companies/companies.mutations';

import styles from './company-create.module.scss';

export const CompanyCreate: VFC = () => {
  const { t } = useTranslation();

  const values = useValues();

  const { mutate: createCompany } = useCreateCompany();

  const onSubmit = ({
    name,
    email,
    phone,
    description,
  }: CompanyCreateFormValues) => {
    createCompany({ form: { name, email, phone, description } });
  };

  const { handleSubmit, refs, errorMessages, isDisabled } =
    useCompanyCreateForm(onSubmit, values);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <TextInput
          {...refs.name}
          label={t('users:company.form.name.label')}
          error={errorMessages.name}
        />

        <TextInput
          {...refs.email}
          type="email"
          label={t('users:company.form.email.label')}
          error={errorMessages.email}
        />

        <TextInput
          {...refs.phone}
          type="phone"
          label={t('users:company.form.phone.label')}
          error={errorMessages.phone}
        />

        <TextInput
          {...refs.description}
          label={t('users:company.form.description.label')}
          type="textarea"
          rows={10}
        />
      </div>

      <div className={styles.actions}>
        <Button
          label={t('common:actions.save')}
          variant="primary"
          attributes={{
            type: 'submit',
            disabled: isDisabled,
          }}
        />
      </div>
    </form>
  );
};

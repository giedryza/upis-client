import React, { useMemo, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import styles from './form-info.module.scss';

import { Input } from 'ui/input/input.component';
import { Button } from 'ui/button/button.component';
import { submitCompanyForm } from 'domain/companies/companies.thunks';
import { useFormInfo } from 'components/users/company/form-info/form-info.hooks';
import { selectMyCompany } from 'domain/companies/companies.selectors';
import { FormInfoValues } from 'components/users/company/form-info/form-info.types';

const FormInfo: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const myCompany = useSelector(selectMyCompany);

  const values = useMemo(
    () =>
      myCompany
        ? {
            name: myCompany.name,
            phone: myCompany.phone,
            email: myCompany.email,
          }
        : null,
    [myCompany]
  );

  const onSubmit = ({ name, email, phone }: FormInfoValues) => {
    dispatch(submitCompanyForm({ name, email, phone }));
  };

  const { handleSubmit, refs, errorMessages, isSubmitDisabled } = useFormInfo(
    onSubmit,
    values
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Input
          name="name"
          label={t('users:company.form.name')}
          ref={refs.name}
          error={errorMessages.name}
        />

        <Input
          name="email"
          label={t('users:company.form.email')}
          ref={refs.email}
          error={errorMessages.email}
        />

        <Input
          name="phone"
          label={t('users:company.form.phone')}
          ref={refs.phone}
          error={errorMessages.phone}
        />
      </div>

      <div className={styles.actions}>
        <Button
          label={t('common:actions.next')}
          styleType="primary"
          type="submit"
          disabled={isSubmitDisabled}
        />
      </div>
    </form>
  );
};

export { FormInfo };

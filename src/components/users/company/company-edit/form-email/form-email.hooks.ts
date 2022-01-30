import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { selectMyCompany } from 'domain/companies/companies.selectors';
import { FORM_EMAIL_INITIAL_VALUES } from 'components/users/company/company-edit/form-email/form-email.constants';
import { FormEmailValues } from 'components/users/company/company-edit/form-email/form-email.types';

export const useFormEmail: UseFormBase<FormEmailValues> = (
  onSubmit,
  values
) => {
  const { t } = useTranslation();

  const { register, reset, handleSubmit, formState } = useForm<FormEmailValues>(
    {
      defaultValues: values,
    }
  );

  const { isSubmitting, isValidating, isSubmitted, isValid, errors } =
    formState;

  const validation: ValidationRules<FormEmailValues> = {
    email: {
      required: {
        value: true,
        message: t('users:company.form.email.errors.empty'),
      },
    },
  };

  const errorMessages = {
    email: isSubmitted ? errors.email?.message : '',
  };

  const refs = {
    email: register('email', { ...validation.email }),
  };

  useEffect(() => {
    reset({
      email: values.email,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isDisabled: isSubmitting || isValidating || (isSubmitted && !isValid),
  };
};

export const useValues = (): FormEmailValues => {
  const myCompany = useSelector(selectMyCompany);

  const values = useMemo(
    (): FormEmailValues =>
      myCompany
        ? {
            email: myCompany.email,
          }
        : FORM_EMAIL_INITIAL_VALUES,
    [myCompany]
  );

  return values;
};

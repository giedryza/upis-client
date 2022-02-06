import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { FORM_EMAIL_INITIAL_VALUES } from 'components/users/company/company-edit/form-email/form-email.constants';
import { FormEmailValues } from 'components/users/company/company-edit/form-email/form-email.types';
import { useMyCompany } from 'domain/companies/companies.queries';

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
  const { data: company } = useMyCompany();

  const values = useMemo(
    (): FormEmailValues =>
      company
        ? {
            email: company.email,
          }
        : FORM_EMAIL_INITIAL_VALUES,
    [company]
  );

  return values;
};

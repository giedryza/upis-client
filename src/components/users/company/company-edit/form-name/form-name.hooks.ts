import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { FORM_NAME_INITIAL_VALUES } from 'components/users/company/company-edit/form-name/form-name.constants';
import { FormNameValues } from 'components/users/company/company-edit/form-name/form-name.types';
import { useMyCompany } from 'domain/companies/companies.queries';

export const useFormName: UseFormBase<FormNameValues> = (onSubmit, values) => {
  const { t } = useTranslation();

  const { register, reset, handleSubmit, formState } = useForm<FormNameValues>({
    defaultValues: values,
  });

  const { isSubmitting, isValidating, isSubmitted, isValid, errors } =
    formState;

  const validation: ValidationRules<FormNameValues> = {
    name: {
      required: {
        value: true,
        message: t('users:company.form.name.errors.empty'),
      },
    },
  };

  const errorMessages = {
    name: isSubmitted ? errors.name?.message : '',
  };

  const refs = {
    name: register('name', { ...validation.name }),
  };

  useEffect(() => {
    reset({
      name: values.name,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isDisabled: isSubmitting || isValidating || (isSubmitted && !isValid),
  };
};

export const useValues = (): FormNameValues => {
  const { data: company } = useMyCompany();

  const values = useMemo(
    (): FormNameValues =>
      company
        ? {
            name: company.name,
          }
        : FORM_NAME_INITIAL_VALUES,
    [company]
  );

  return values;
};

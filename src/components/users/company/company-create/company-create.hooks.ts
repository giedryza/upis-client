import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { CompanyCreateFormValues } from 'components/users/company/company-create/company-create.types';
import { INITIAL_VALUES } from 'components/users/company/company-create/company-create.constants';
import { useMyCompany } from 'domain/companies/companies.queries';

export const useCompanyCreateForm: UseFormBase<CompanyCreateFormValues> = (
  onSubmit,
  values
) => {
  const { t } = useTranslation();

  const { register, reset, handleSubmit, formState } =
    useForm<CompanyCreateFormValues>({
      defaultValues: values,
    });

  const { isSubmitting, isValidating, isSubmitted, isValid, errors } =
    formState;

  const validation: ValidationRules<CompanyCreateFormValues> = {
    name: {
      required: {
        value: true,
        message: t('users:company.form.name.errors.empty'),
      },
    },
    email: {
      required: {
        value: true,
        message: t('users:company.form.email.errors.empty'),
      },
    },
    phone: {
      required: {
        value: true,
        message: t('users:company.form.phone.errors.empty'),
      },
    },
  };

  const errorMessages = {
    name: isSubmitted ? errors.name?.message : '',
    phone: isSubmitted ? errors.phone?.message : '',
    email: isSubmitted ? errors.email?.message : '',
  };

  const refs = {
    name: register('name', { ...validation.name }),
    phone: register('phone', { ...validation.phone }),
    email: register('email', { ...validation.email }),
    description: register('description', { ...validation.description }),
  };

  useEffect(() => {
    reset({
      name: values.name,
      phone: values.phone,
      email: values.email,
      description: values.description,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isDisabled: isSubmitting || isValidating || (isSubmitted && !isValid),
  };
};

export const useValues = (): CompanyCreateFormValues => {
  const { data: company } = useMyCompany();

  const values = useMemo(
    (): CompanyCreateFormValues =>
      company
        ? {
            name: company.name,
            phone: company.phone,
            email: company.email,
            description: company.description,
          }
        : INITIAL_VALUES,
    [company]
  );

  return values;
};

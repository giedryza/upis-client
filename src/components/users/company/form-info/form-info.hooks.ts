import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { MyCompanyInfoFormValues } from 'components/users/company/form-info/form-info.types';
import { selectMyCompany } from 'domain/companies/companies.selectors';
import { INITIAL_VALUES } from 'components/users/company/form-info/form-info.constants';

export const useMyCompanyInfoForm: UseFormBase<MyCompanyInfoFormValues> = (
  onSubmit,
  values
) => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState,
  } = useForm<MyCompanyInfoFormValues>({
    defaultValues: values,
  });

  const {
    isSubmitting,
    isValidating,
    isSubmitted,
    isValid,
    errors,
  } = formState;

  const validation: ValidationRules<MyCompanyInfoFormValues> = {
    name: {
      required: {
        value: true,
        message: t('users:errors.company.name.empty'),
      },
    },
    email: {
      required: {
        value: true,
        message: t('users:errors.company.email.empty'),
      },
    },
    phone: {
      required: {
        value: true,
        message: t('users:errors.company.phone.empty'),
      },
    },
  };

  const errorMessages = {
    name: isSubmitted ? errors.name?.message : '',
    phones: isSubmitted ? errors.phone?.message : '',
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

export const useValues = (): MyCompanyInfoFormValues => {
  const myCompany = useSelector(selectMyCompany);

  const values = useMemo(
    (): MyCompanyInfoFormValues =>
      myCompany
        ? {
            name: myCompany.name,
            phone: myCompany.phone,
            email: myCompany.email,
            description: myCompany.description,
          }
        : INITIAL_VALUES,
    [myCompany]
  );

  return values;
};

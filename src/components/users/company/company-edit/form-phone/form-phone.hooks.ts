import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { FORM_PHONE_INITIAL_VALUES } from 'components/users/company/company-edit/form-phone/form-phone.constants';
import { FormPhoneValues } from 'components/users/company/company-edit/form-phone/form-phone.types';
import { useMyCompany } from 'domain/companies/companies.queries';

export const useFormPhone: UseFormBase<FormPhoneValues> = (
  onSubmit,
  values
) => {
  const { t } = useTranslation();

  const { register, reset, handleSubmit, formState } = useForm<FormPhoneValues>(
    {
      defaultValues: values,
    }
  );

  const { isSubmitting, isValidating, isSubmitted, isValid, errors } =
    formState;

  const validation: ValidationRules<FormPhoneValues> = {
    phone: {
      required: {
        value: true,
        message: t('users:company.form.phone.errors.empty'),
      },
    },
  };

  const errorMessages = {
    phone: isSubmitted ? errors.phone?.message : '',
  };

  const refs = {
    phone: register('phone', { ...validation.phone }),
  };

  useEffect(() => {
    reset({
      phone: values.phone,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isDisabled: isSubmitting || isValidating || (isSubmitted && !isValid),
  };
};

export const useValues = (): FormPhoneValues => {
  const { data: company } = useMyCompany();

  const values = useMemo(
    (): FormPhoneValues =>
      company
        ? {
            phone: company.phone,
          }
        : FORM_PHONE_INITIAL_VALUES,
    [company]
  );

  return values;
};

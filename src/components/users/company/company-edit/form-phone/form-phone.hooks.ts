import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { selectMyCompany } from 'domain/companies/companies.selectors';
import { FORM_PHONE_INITIAL_VALUES } from 'components/users/company/company-edit/form-phone/form-phone.constants';
import { FormPhoneValues } from 'components/users/company/company-edit/form-phone/form-phone.types';

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

  const {
    isSubmitting,
    isValidating,
    isSubmitted,
    isValid,
    errors,
  } = formState;

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
  const myCompany = useSelector(selectMyCompany);

  const values = useMemo(
    (): FormPhoneValues =>
      myCompany
        ? {
            phone: myCompany.phone,
          }
        : FORM_PHONE_INITIAL_VALUES,
    [myCompany]
  );

  return values;
};

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { selectMyCompany } from 'domain/companies/companies.selectors';
import { FORM_WEBSITE_INITIAL_VALUES } from 'components/users/company/company-edit/form-website/form-website.constants';
import { FormWebsiteValues } from 'components/users/company/company-edit/form-website/form-website.types';

export const useFormWebsite: UseFormBase<FormWebsiteValues> = (
  onSubmit,
  values
) => {
  const {
    register,
    reset,
    handleSubmit,
    formState,
  } = useForm<FormWebsiteValues>({
    defaultValues: values,
  });

  const {
    isSubmitting,
    isValidating,
    isSubmitted,
    isValid,
    errors,
  } = formState;

  const validation: ValidationRules<FormWebsiteValues> = {
    website: {},
  };

  const errorMessages = {
    website: isSubmitted ? errors.website?.message : '',
  };

  const refs = {
    website: register('website', { ...validation.website }),
  };

  useEffect(() => {
    reset({
      website: values.website,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isDisabled: isSubmitting || isValidating || (isSubmitted && !isValid),
  };
};

export const useValues = (): FormWebsiteValues => {
  const myCompany = useSelector(selectMyCompany);

  const values = useMemo(
    (): FormWebsiteValues =>
      myCompany
        ? {
            website: myCompany.website,
          }
        : FORM_WEBSITE_INITIAL_VALUES,
    [myCompany]
  );

  return values;
};

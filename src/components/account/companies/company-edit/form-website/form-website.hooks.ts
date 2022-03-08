import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { FORM_WEBSITE_INITIAL_VALUES } from 'components/account/company/company-edit/form-website/form-website.constants';
import { FormWebsiteValues } from 'components/account/company/company-edit/form-website/form-website.types';
import { useMyCompany } from 'domain/companies/companies.queries';

export const useFormWebsite: UseFormBase<FormWebsiteValues> = (
  onSubmit,
  values
) => {
  const { register, reset, handleSubmit, formState } =
    useForm<FormWebsiteValues>({
      defaultValues: values,
    });

  const { isSubmitting, isValidating, isSubmitted, isValid, errors } =
    formState;

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
  const { data: company } = useMyCompany();

  const values = useMemo(
    (): FormWebsiteValues =>
      company
        ? {
            website: company.website,
          }
        : FORM_WEBSITE_INITIAL_VALUES,
    [company]
  );

  return values;
};

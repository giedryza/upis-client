import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { FORM_DESCRIPTION_INITIAL_VALUES } from 'components/users/company/company-edit/form-description/form-description.constants';
import { FormDescriptionValues } from 'components/users/company/company-edit/form-description/form-description.types';
import { useMyCompany } from 'domain/companies/companies.queries';

export const useFormDescription: UseFormBase<FormDescriptionValues> = (
  onSubmit,
  values
) => {
  const { register, reset, handleSubmit, formState } =
    useForm<FormDescriptionValues>({
      defaultValues: values,
    });

  const { isSubmitting, isValidating, isSubmitted, isValid, errors } =
    formState;

  const validation: ValidationRules<FormDescriptionValues> = {
    description: {},
  };

  const errorMessages = {
    description: isSubmitted ? errors.description?.message : '',
  };

  const refs = {
    description: register('description', { ...validation.description }),
  };

  useEffect(() => {
    reset({
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

export const useValues = (): FormDescriptionValues => {
  const { data: company } = useMyCompany();

  const values = useMemo(
    (): FormDescriptionValues =>
      company
        ? {
            description: company.description,
          }
        : FORM_DESCRIPTION_INITIAL_VALUES,
    [company]
  );

  return values;
};

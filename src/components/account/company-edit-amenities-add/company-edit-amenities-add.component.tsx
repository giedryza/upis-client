import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, NumberInput, SelectInput, TextInput } from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';
import { units, useAddAmenity, variants } from 'domain/amenities';
import { useFormatNumber } from 'tools/format';
import { currencies } from 'types/common';

import { Values } from './company-edit-amenities-add.types';
import { INITIAL_VALUES } from './company-edit-amenities-add.constants';
import styles from './company-edit-amenities-add.module.scss';

export const CompanyEditAmenitiesAdd: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { formatter: numberFormatter } = useFormatNumber();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: company } = useActiveCompany();
  const { mutate: addAmenity, isLoading } = useAddAmenity();

  const onSubmit: SubmitHandler<Values> = ({
    variant,
    amount,
    currency,
    unit,
    info,
  }) => {
    const companyId = company?._id;

    if (!companyId) return;

    addAmenity(
      {
        form: {
          variant,
          amount: amount * 100,
          currency,
          unit,
          info,
          companyId,
        },
      },
      {
        onSuccess: () => {
          push(routes.account.companies.one.index.replace(':id', companyId));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:companies.amenities.title')}
      icon="link"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <SelectInput
              {...register('variant', {
                required: {
                  value: true,
                  message: t(
                    'account:companies.amenities.form.variant.error.empty'
                  ),
                },
              })}
              label={t('account:companies.amenities.form.variant.label')}
              error={errors.variant?.message}
              options={variants.map((variant) => ({
                label: t(`common:amenities.variants.${variant}`),
                value: variant,
              }))}
            />

            <div className={styles.price}>
              <Controller
                control={control}
                name="amount"
                render={({ field: { name, onChange, value, ref } }) => (
                  <NumberInput
                    label={t('account:companies.amenities.form.amount.label')}
                    name={name}
                    value={value}
                    placeholder={numberFormatter.format(15.5)}
                    onChange={onChange}
                    step={0.01}
                    error={errors.amount?.message}
                    ref={ref}
                  />
                )}
              />

              <SelectInput
                {...register('currency')}
                label={t('account:companies.amenities.form.currency.label')}
                error={errors.currency?.message}
                options={currencies.map((currency) => ({
                  label: currency,
                  value: currency,
                }))}
              />

              <SelectInput
                {...register('unit')}
                label={t('account:companies.amenities.form.unit.label')}
                error={errors.unit?.message}
                options={units.map((unit) => ({
                  label: t(`common:amenities.units.${unit}`),
                  value: unit,
                }))}
              />
            </div>

            <TextInput
              {...register('info')}
              label={t('account:companies.amenities.form.info.label')}
              error={errors.info?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.companies.one.index.replace(
                ':id',
                company?._id ?? ''
              )}
            />

            <Button
              label={t('common:actions.add')}
              variant="tertiary"
              size="sm"
              attributes={{
                type: 'submit',
                disabled: !isDirty || isLoading,
              }}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};

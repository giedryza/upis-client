import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  CheckboxInput,
  Container,
  NumberInput,
  SelectInput,
  TextInput,
} from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { units, useAddAmenity, variants } from 'domain/amenities';
import { useFormatNumber } from 'tools/format';
import { currencies } from 'types/common';
import { getRouteParam } from 'tools/common';

import { Values } from './company-edit-amenities-add.types';
import { INITIAL_VALUES } from './company-edit-amenities-add.constants';
import styles from './company-edit-amenities-add.module.scss';

export const CompanyEditAmenitiesAdd: VFC = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const companyId = getRouteParam(query.id);

  const { formatter: numberFormatter } = useFormatNumber();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: addAmenity, isLoading } = useAddAmenity();

  const onSubmit: SubmitHandler<Values> = ({
    variant,
    amount,
    currency,
    unit,
    info,
  }) => {
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

  const [isFree] = watch(['isFree']);

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
                    disabled={isFree}
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
                disabled={isFree}
              />

              <SelectInput
                {...register('unit')}
                label={t('account:companies.amenities.form.unit.label')}
                error={errors.unit?.message}
                options={units.map((unit) => ({
                  label: t(`common:amenities.units.${unit}`),
                  value: unit,
                }))}
                disabled={isFree}
              />
            </div>

            <Controller
              control={control}
              name="isFree"
              render={({ field: { name, onChange, value, ref } }) => (
                <CheckboxInput
                  label={t('common:texts.free')}
                  name={name}
                  checked={value}
                  onChange={(checked) => {
                    onChange(checked);
                    setValue('amount', 0);
                  }}
                  ref={ref}
                />
              )}
            />

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
              url={routes.account.companies.one.index.replace(':id', companyId)}
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

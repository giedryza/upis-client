import { useEffect, VFC } from 'react';
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
import {
  useUpdateAmenity,
  useAmenity,
  variants,
  units,
} from 'domain/amenities';
import { useFormatNumber } from 'tools/format';
import { currencies } from 'types/common';
import { getRouteParam, toInteger } from 'tools/common';

import { Values } from './provider-edit-amenities-edit.types';
import { INITIAL_VALUES } from './provider-edit-amenities-edit.constants';
import styles from './provider-edit-amenities-edit.module.scss';

export const ProviderEditAmenitiesEdit: VFC = () => {
  const { t } = useTranslation();
  const { query, push } = useRouter();

  const id = getRouteParam(query.amenityId);
  const providerId = getRouteParam(query.id);

  const { formatter: numberFormatter } = useFormatNumber();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: amenity } = useAmenity(id);
  const { mutate: updateAmenity, isLoading } = useUpdateAmenity();

  useEffect(() => {
    reset({
      variant: amenity?.variant,
      amount: amenity?.price ? amenity.price.amount / 100 : 0,
      currency: amenity?.price?.currency ?? 'EUR',
      unit: amenity?.unit,
      info: amenity?.info,
      isFree: !amenity?.price,
    });
  }, [reset, amenity]);

  const onSubmit: SubmitHandler<Values> = ({
    variant,
    amount,
    currency,
    unit,
    info,
  }) => {
    updateAmenity(
      {
        id,
        providerId,
        form: {
          variant,
          amount: toInteger(amount * 100),
          currency,
          unit,
          info,
        },
      },
      {
        onSuccess: () => {
          push(routes.account.providers.one.index.replace(':id', providerId));
        },
      }
    );
  };

  const [isFree] = watch(['isFree']);

  return (
    <InfoBlock
      title={t('account:providers.amenities.title')}
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
                    'account:providers.amenities.form.variant.error.empty'
                  ),
                },
              })}
              label={t('account:providers.amenities.form.variant.label')}
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
                    label={t('account:providers.amenities.form.amount.label')}
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
                label={t('account:providers.amenities.form.currency.label')}
                error={errors.currency?.message}
                options={currencies.map((currency) => ({
                  label: currency,
                  value: currency,
                }))}
                disabled={isFree}
              />

              <SelectInput
                {...register('unit')}
                label={t('account:providers.amenities.form.unit.label')}
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
              label={t('account:providers.amenities.form.info.label')}
              error={errors.info?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.providers.one.index.replace(
                ':id',
                providerId
              )}
            />

            <Button
              label={t('common:actions.save')}
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

import { FC } from 'react';
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
import { routes } from 'config';
import { getParams } from 'schemas';
import { InfoBlock } from 'components/account/atoms';
import { useUpdateAmenity, useAmenity, units } from 'domain/amenities';
import { useFormatNumber } from 'tools/format';
import { currencies } from 'types/common';
import { generateUrl, toCents } from 'tools/common';

import { Values } from './provider-edit-amenities-edit.types';
import { INITIAL_VALUES } from './provider-edit-amenities-edit.constants';
import styles from './provider-edit-amenities-edit.module.scss';

export const ProviderEditAmenitiesEdit: FC = () => {
  const { t } = useTranslation();
  const { query, push } = useRouter();
  const { formatter: numberFormatter } = useFormatNumber();
  const { id, amenityId } = getParams(
    routes.account.providers.one.amenities.one
  ).parse(query);

  const { data: amenity } = useAmenity(amenityId);
  const { mutate: updateAmenity, isLoading } = useUpdateAmenity();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    values: amenity
      ? {
          amount: amenity.price ? amenity.price.amount / 100 : 0,
          currency: amenity.price?.currency ?? 'EUR',
          unit: amenity.unit,
          info: amenity.info,
          isFree: !amenity.price,
        }
      : undefined,
  });

  const onSubmit: SubmitHandler<Values> = ({
    amount,
    currency,
    unit,
    info,
  }) => {
    updateAmenity(
      {
        id: amenityId,
        providerId: id,
        form: {
          amount: toCents(amount),
          currency,
          unit,
          info,
        },
      },
      {
        onSuccess: () => {
          push(generateUrl(routes.account.providers.one.index, { id }));
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
            <TextInput
              label={t('account:providers.amenities.form.variant.label')}
              value={t(`amenities:variants.${amenity?.variant}`)}
              name="amenity"
              readonly
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
                  label: t(`amenities:units.${unit}`),
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
              as="link"
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              href={generateUrl(routes.account.providers.one.index, { id })}
            />

            <Button
              as="button"
              label={t('common:actions.save')}
              variant="tertiary"
              size="sm"
              type="submit"
              disabled={!isDirty || isLoading}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};

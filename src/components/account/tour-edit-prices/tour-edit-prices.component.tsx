import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, NumberInput, SelectInput } from 'ui';
import { routes } from 'config/routes';
import { currencies } from 'types/common';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useUpdateTourPrice } from 'domain/tours';
import { useFormatNumber } from 'tools/format';

import { Values } from './tour-edit-prices.types';
import { INITIAL_VALUES } from './tour-edit-prices.constants';
import styles from './tour-edit-prices.module.scss';

export const TourEditPrices: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { formatter: numberFormatter } = useFormatNumber();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: tour } = useActiveTour();
  const { mutate: updateTourPrice, isLoading } = useUpdateTourPrice();

  useEffect(() => {
    reset({
      amount: tour?.price?.amount ? tour.price.amount / 100 : NaN,
      currency: tour?.price?.currency ?? 'EUR',
    });
  }, [reset, tour]);

  const onSubmit: SubmitHandler<Values> = ({ amount, currency }) => {
    const tourId = tour?._id;

    if (!tourId) return;

    updateTourPrice(
      {
        id: tourId,
        form: {
          amount: amount * 100,
          currency,
        },
      },
      {
        onSuccess: () => {
          push(routes.account.tours.one.index.replace(':id', tour?._id ?? ''));
        },
      }
    );
  };

  return (
    <InfoBlock title={t('account:tours.prices.title')} icon="price" columns={1}>
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <div className={styles.price}>
              <Controller
                control={control}
                name="amount"
                rules={{
                  min: {
                    value: 0.01,
                    message: t('account:tours.prices.form.price.error.min'),
                  },
                }}
                render={({ field: { name, onChange, value, ref } }) => (
                  <NumberInput
                    label={t('account:tours.prices.form.price.label')}
                    info={t('account:tours.prices.form.price.info')}
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
                {...register('currency', {
                  required: {
                    value: true,
                    message: t(
                      'account:tours.prices.form.currency.error.empty'
                    ),
                  },
                })}
                label={t('account:tours.prices.form.currency.label')}
                error={errors.currency?.message}
                options={currencies.map((currency) => ({
                  label: currency,
                  value: currency,
                }))}
              />
            </div>
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.tours.one.index.replace(
                ':id',
                tour?._id ?? ''
              )}
            />

            <Button
              label={t('common:actions.save')}
              variant="tertiary"
              size="sm"
              attributes={{
                type: 'submit',
                disabled: isLoading,
              }}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
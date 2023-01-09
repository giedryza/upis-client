import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, CheckboxGroupInput, Container, Toast } from 'ui';
import { routes } from 'config/routes';
import { generateUrl } from 'tools/common';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useUpdateTourAmenities } from 'domain/tours';
import { formatCurrency } from 'tools/format';

import { Values } from './tour-edit-amenities.types';
import { INITIAL_VALUES } from './tour-edit-amenities.constants';
import styles from './tour-edit-amenities.module.scss';

export const TourEditAmenities: FC = () => {
  const { t, lang } = useTranslation();
  const { push } = useRouter();

  const { data: tour } = useActiveTour();
  const { mutate: updateTourAmenities, isLoading } = useUpdateTourAmenities();

  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    values: tour
      ? { amenities: tour.amenities.map(({ _id }) => _id) }
      : undefined,
  });

  const onSubmit: SubmitHandler<Values> = ({ amenities }) => {
    const tourId = tour?._id;

    if (!tourId) return;

    updateTourAmenities(
      { id: tourId, form: { amenities } },
      {
        onSuccess: () => {
          push(generateUrl(routes.account.tours.one.index, { id: tourId }));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:tours.amenities.title')}
      icon="link"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Toast
            message={
              <Trans
                i18nKey="account:tours.amenities.texts.info"
                components={[
                  <a
                    href={generateUrl(
                      routes.account.providers.one.amenities.add,
                      { id: tour?.provider._id ?? '' }
                    )}
                    className="link"
                    rel="noreferrer"
                    key="info"
                  >
                    placeholder
                  </a>,
                ]}
              />
            }
            type="info"
          />

          <fieldset className={styles.fieldset} disabled={isLoading}>
            <Controller
              control={control}
              name="amenities"
              render={({ field: { onChange, value, ref } }) => (
                <CheckboxGroupInput
                  label={t('account:tours.amenities.form.amenities.label')}
                  items={
                    tour?.provider.amenities.map((amenity) => ({
                      label: `${t(
                        `common:amenities.variants.${amenity.variant}`
                      )} (${
                        amenity.price
                          ? `${formatCurrency(
                              lang,
                              amenity.price.amount,
                              amenity.price.currency
                            )} ${t(`common:amenities.units.${amenity.unit}`)}`
                          : t('common:texts.free')
                      })`,
                      value: amenity._id,
                    })) ?? []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.amenities?.message}
                  ref={ref}
                />
              )}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={generateUrl(routes.account.tours.one.index, {
                id: tour?._id ?? '',
              })}
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

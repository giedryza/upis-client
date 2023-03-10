import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, CheckboxGroupInput, Container, Toast } from 'ui';
import { routes } from 'config';
import { generateUrl } from 'tools/services/url';
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
      ? { amenities: tour.amenities.map(({ _id }) => _id._id) }
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
                  <Link
                    href={generateUrl(
                      routes.account.providers.one.amenities.add,
                      { id: tour?.provider._id ?? '' }
                    )}
                    className="link"
                    key="info"
                  >
                    placeholder
                  </Link>,
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
                      label: `${t(`amenities:variants.${amenity.variant}`)} (${
                        amenity.price
                          ? `${formatCurrency(
                              lang,
                              amenity.price.amount,
                              amenity.price.currency
                            )} ${t(`amenities:units.${amenity.unit}`)}`
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
              as="link"
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              href={generateUrl(routes.account.tours.one.index, {
                id: tour?._id ?? '',
              })}
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

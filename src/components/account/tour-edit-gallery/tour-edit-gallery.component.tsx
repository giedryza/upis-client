import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, FileInput } from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useAddTourPhoto } from 'domain/tours';

import { Values } from './tour-edit-gallery.types';
import { INITIAL_VALUES } from './tour-edit-gallery.constants';
import styles from './tour-edit-gallery.module.scss';

export const TourEditGallery: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: tour } = useActiveTour();
  const { mutate: addTourPhoto, isLoading } = useAddTourPhoto();

  const onSubmit: SubmitHandler<Values> = (form) => {
    const tourId = tour?._id;

    if (!tourId || !form.photo) return;

    addTourPhoto(
      {
        id: tourId,
        form: {
          photo: form.photo,
          description: form.description,
        },
      },
      {
        onSuccess: () => {
          push(routes.account.tours.one.index.replace(':id', tourId));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:tours.gallery.title')}
      icon="picture"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <Controller
              name="photo"
              control={control}
              render={({ field: { name, onChange, ref } }) => (
                <FileInput
                  name={name}
                  onChange={([file]) => {
                    onChange(file);
                  }}
                  accept={['jpeg', 'jpg', 'png', 'avif', 'svg', 'gif', 'bmp']}
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
                disabled: !isDirty || isLoading,
              }}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, FileInput, TextInput } from 'ui';
import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useAddTourPhoto } from 'domain/tours';

import { Values } from './tour-edit-gallery-add.types';
import { INITIAL_VALUES } from './tour-edit-gallery-add.constants';
import styles from './tour-edit-gallery-add.module.scss';

export const TourEditGalleryAdd: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: tour } = useActiveTour();
  const { mutate: addTourPhoto, isLoading } = useAddTourPhoto();

  if (!tour) return null;

  const onSubmit: SubmitHandler<Values> = (form) => {
    if (!form.photo) return;

    addTourPhoto(
      {
        id: tour._id,
        form: {
          photo: form.photo,
          description: form.description,
        },
      },
      {
        onSuccess: () => {
          push(generateUrl(routes.account.tours.one.index, { id: tour._id }));
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
                  previews
                  ref={ref}
                />
              )}
            />

            <TextInput
              {...register('description')}
              label={t('account:tours.gallery.form.description.label')}
              info={t('account:tours.gallery.form.description.info')}
              error={errors.description?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              as="link"
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              href={generateUrl(routes.account.tours.one.index, {
                id: tour._id,
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

import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, FileInput, ImageBox } from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useUpdateTourPhotos } from 'domain/tours';

import { Values } from './tour-edit-gallery.types';
import { INITIAL_VALUES } from './tour-edit-gallery.constants';
import styles from './tour-edit-gallery.module.scss';

const MAX_PHOTOS = 5;

export const TourEditGallery: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { handleSubmit, control, setValue, watch } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: tour } = useActiveTour();
  const { mutate: updatePhotos, isLoading } = useUpdateTourPhotos();

  const [photosToRemove] = watch(['photosToRemove']);

  const onSubmit: SubmitHandler<Values> = (form) => {
    const tourId = tour?._id;

    if (!tourId) return;

    updatePhotos(
      {
        id: tourId,
        form: {
          photosToRemove: form.photosToRemove,
          photos: form.photos,
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
      <div className={styles.container}>
        <div className={styles.gallery}>
          {tour?.photos
            .filter((photo) => !photosToRemove.includes(photo.key))
            .map((photo, i) => (
              <ImageBox
                image={photo.location}
                alt=""
                actions={[
                  {
                    icon: 'trash',
                    attributes: {
                      title: t('common:actions.delete'),
                      onClick: () => {
                        setValue('photosToRemove', [
                          ...photosToRemove,
                          photo.key,
                        ]);
                      },
                    },
                  },
                ]}
                key={i}
              />
            ))}
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <Controller
              name="photos"
              control={control}
              render={({ field: { name, onChange, ref } }) => (
                <FileInput
                  name={name}
                  onChange={(files) => {
                    onChange(files);
                  }}
                  accept={['jpeg', 'jpg', 'png', 'avif', 'svg', 'gif', 'bmp']}
                  maxFiles={MAX_PHOTOS}
                  disabled={
                    (tour?.photos.length ?? 0) - photosToRemove.length >=
                    MAX_PHOTOS
                  }
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
                disabled: isLoading,
              }}
            />
          </div>
        </form>
      </div>
    </InfoBlock>
  );
};

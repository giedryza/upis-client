import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, TextInput } from 'ui';
import { routes } from 'config/routes';
import { getRouteParam } from 'tools/common';
import { InfoBlock } from 'components/account/atoms';
import { useImage, useUpdateImage } from 'domain/images';

import { Values } from './tour-edit-gallery-edit.types';
import { INITIAL_VALUES } from './tour-edit-gallery-edit.constants';
import styles from './tour-edit-gallery-edit.module.scss';

export const TourEditGalleryEdit: VFC = () => {
  const { t } = useTranslation();
  const { query, push } = useRouter();

  const id = getRouteParam(query.imageId);
  const tourId = getRouteParam(query.id);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: image } = useImage(id);
  const { mutate: updateImage, isLoading } = useUpdateImage();

  useEffect(() => {
    reset({
      description: image?.description ?? '',
    });
  }, [reset, image]);

  const onSubmit: SubmitHandler<Values> = (form) => {
    const imageId = image?._id;

    if (!imageId) return;

    updateImage(
      {
        id: imageId,
        form: {
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
            <TextInput
              {...register('description')}
              label={t('account:tours.gallery.form.description.label')}
              info={t('account:tours.gallery.form.description.info')}
              error={errors.description?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.tours.one.index.replace(':id', tourId)}
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

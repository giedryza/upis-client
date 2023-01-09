import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, ImageTile, TextInput } from 'ui';
import { routes } from 'config/routes';
import { generateUrl, getRouteParam } from 'tools/common';
import { InfoBlock } from 'components/account/atoms';
import { useDeleteImage, useImage, useUpdateImage } from 'domain/images';
import { useAppDispatch } from 'tools/services/store';
import { lightbox } from 'domain/lightbox';
import { useConfirm } from 'domain/confirm';

import { Values } from './tour-edit-gallery-edit.types';
import { INITIAL_VALUES } from './tour-edit-gallery-edit.constants';
import styles from './tour-edit-gallery-edit.module.scss';

export const TourEditGalleryEdit: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { query, push } = useRouter();

  const { confirmation } = useConfirm();

  const id = getRouteParam(query.imageId);
  const tourId = getRouteParam(query.id);

  const { data: image } = useImage(id);
  const { mutate: updateImage, isLoading } = useUpdateImage();
  const { mutate: deleteImage, isLoading: isDeleting } = useDeleteImage();

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    values: image
      ? {
          description: image?.description ?? '',
        }
      : undefined,
  });

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
          push(generateUrl(routes.account.tours.one.index, { id: tourId }));
        },
      }
    );
  };

  if (!image) return null;

  return (
    <InfoBlock
      title={t('account:tours.gallery.title')}
      icon="picture"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <ImageTile
              image={image.url}
              alt={image.description}
              sizes={{ width: 540, height: 304 }}
              actions={[
                {
                  icon: 'magnifying-glass',
                  attributes: {
                    title: t('common:actions.zoom'),
                    onClick: () => {
                      dispatch(
                        lightbox.actions.open({
                          images: [
                            {
                              id: image._id,
                              url: image.url,
                              alt: image.description,
                            },
                          ],
                        })
                      );
                    },
                  },
                },
                {
                  icon: 'trash',
                  attributes: {
                    title: t('common:actions.delete'),
                    onClick: async () => {
                      const { confirmed } = await confirmation(
                        t('account:tours.gallery.texts.confirmDelete')
                      );

                      if (confirmed) {
                        deleteImage(
                          { id: image._id },
                          {
                            onSuccess: () => {
                              push(
                                generateUrl(routes.account.tours.one.index, {
                                  id: tourId,
                                })
                              );
                            },
                          }
                        );
                      }
                    },
                    disabled: isDeleting,
                  },
                },
              ]}
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
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={generateUrl(routes.account.tours.one.index, {
                id: tourId,
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

import { FC } from 'react';
import { useQueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

import { EmptyState, ImageTile } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { toursKeys, useActiveTour, useUpdateTour } from 'domain/tours';
import { routes } from 'config/routes';
import { useDeleteImage } from 'domain/images';
import { useConfirm } from 'domain/confirm';

import styles from './gallery.module.scss';

export const Gallery: FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { confirmation } = useConfirm();

  const { data: tour } = useActiveTour();
  const { mutate: deleteImage, isLoading: isDeleting } = useDeleteImage();
  const { mutate: updateTour } = useUpdateTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.gallery.title')}
      columns={1}
      icon="picture"
      actions={[
        {
          url: routes.account.tours.one.gallery.replace(':id', tour._id),
          label: t('common:actions.add'),
          variant: 'tertiary',
          icon: 'plus',
        },
      ]}
    >
      {tour.photos.length ? (
        <div className={styles.gallery}>
          {tour.photos.map((photo, i) => (
            <ImageTile
              image={photo.url}
              alt={photo.description}
              {...(tour.primaryPhoto === photo._id && {
                label: t('account:tours.gallery.texts.primary'),
                status: 'info',
              })}
              actions={[
                {
                  icon: 'star',
                  attributes: {
                    title: t('account:tours.gallery.actions.primary'),
                    onClick: () => {
                      updateTour({
                        id: tour._id,
                        form: { primaryPhoto: photo._id },
                      });
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
                          { id: photo._id },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries(
                                toursKeys.detail(tour._id)
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
              key={i}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t('account:tours.gallery.texts.empty.title')}
          message={t('account:tours.gallery.texts.empty.message')}
        />
      )}
    </InfoBlock>
  );
};

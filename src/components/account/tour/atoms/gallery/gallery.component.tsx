import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useTranslation from 'next-translate/useTranslation';

import { EmptyState, ImageTile } from 'ui';
import { generateUrl } from 'tools/common';
import { useAppDispatch } from 'tools/services';
import { InfoBlock } from 'components/account/atoms';
import { toursKeys, useActiveTour, useUpdateTour } from 'domain/tours';
import { routes } from 'config';
import { useDeleteImage } from 'domain/images';
import { useConfirm } from 'domain/confirm';
import { lightbox } from 'domain/lightbox';

import styles from './gallery.module.scss';

export const Gallery: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
          as: 'link',
          href: generateUrl(routes.account.tours.one.gallery.add, {
            id: tour._id,
          }),
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
              tags={[
                ...(tour.primaryPhoto === photo._id
                  ? [
                      {
                        label: t('account:tours.gallery.texts.primary'),
                        status: 'info' as const,
                      },
                    ]
                  : []),
              ]}
              actions={[
                {
                  as: 'button',
                  icon: 'magnifying-glass',
                  title: t('common:actions.zoom'),
                  onClick: () => {
                    dispatch(
                      lightbox.actions.open({
                        images: tour.photos.map((pic) => ({
                          id: pic._id,
                          url: pic.url,
                          alt: pic.description,
                        })),
                        currentImage: photo._id,
                      })
                    );
                  },
                },
                {
                  as: 'button',
                  icon: 'star',
                  title: t('account:tours.gallery.actions.primary'),
                  onClick: () => {
                    updateTour({
                      id: tour._id,
                      form: { primaryPhoto: photo._id },
                    });
                  },
                },
                {
                  as: 'link',
                  icon: 'pencil',
                  href: generateUrl(routes.account.tours.one.gallery.one, {
                    id: tour._id,
                    imageId: photo._id,
                  }),
                  title: t('common:actions.edit'),
                },
                {
                  as: 'button',
                  icon: 'trash',
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
              ]}
              sizes={{ xs: 509, sm: 509, md: 380, lg: 320, default: 320 }}
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

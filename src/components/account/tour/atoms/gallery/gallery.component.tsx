import { FC } from 'react';
import { useQueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

import { ImageTile } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { toursKeys, useActiveTour } from 'domain/tours';
import { routes } from 'config/routes';
import { useDeleteImage } from 'domain/images';
import { useConfirm } from 'domain/confirm';

import styles from './gallery.module.scss';

export const Gallery: FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { confirmation } = useConfirm();

  const { data: tour } = useActiveTour();
  const { mutate: deleteImage, isLoading } = useDeleteImage();

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
      <div className={styles.gallery}>
        {tour.photos.map((photo, i) => (
          <ImageTile
            image={photo.url}
            alt={photo.description}
            actions={[
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
                  disabled: isLoading,
                },
              },
            ]}
            key={i}
          />
        ))}
      </div>
    </InfoBlock>
  );
};

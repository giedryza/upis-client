import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider } from 'domain/providers';
import { routes } from 'config';
import { Tile } from 'ui';
import { formatCurrency } from 'tools/format';
import { ICON_BY_VARIANT, useDeleteAmenity } from 'domain/amenities';
import { useConfirm } from 'domain/confirm';
import { generateUrl } from 'tools/services';
import { useUpdateTours } from 'domain/tours';

export const Amenities: FC = () => {
  const { t, lang } = useTranslation();

  const { confirmation } = useConfirm();

  const { data: provider } = useActiveProvider();
  const { mutate: deleteAmenity, isLoading: isDeleting } = useDeleteAmenity();
  const { mutate: updateTours, isLoading: isUpdatingTours } = useUpdateTours();

  if (!provider) return null;

  return (
    <InfoBlock
      title={t('account:providers.amenities.title')}
      icon="link"
      columns={2}
      actions={[
        {
          as: 'link',
          href: generateUrl(routes.account.providers.one.amenities.add, {
            id: provider._id,
          }),
          label: t('common:actions.add'),
          variant: 'tertiary',
          icon: 'plus',
        },
      ]}
    >
      {provider.amenities.map((amenity) => (
        <Tile
          title={t(`amenities:variants.${amenity.variant}`)}
          subtitle={amenity.info}
          icon={ICON_BY_VARIANT[amenity.variant]}
          fields={[
            {
              label: t('account:providers.amenities.form.amount.display'),
              sublabel: amenity.price
                ? `${formatCurrency(
                    lang,
                    amenity.price.amount,
                    amenity.price.currency
                  )} ${t(`amenities:units.${amenity.unit}`)}`
                : t('common:texts.free'),
            },
          ]}
          actions={[
            {
              as: 'link',
              label: t('common:actions.edit'),
              icon: 'pencil',
              variant: 'secondary',
              href: generateUrl(routes.account.providers.one.amenities.one, {
                id: provider._id,
                amenityId: amenity._id,
              }),
            },
            {
              as: 'button',
              label: t('account:providers.amenities.actions.add_to_all_tours'),
              icon: 'path',
              variant: 'secondary',
              disabled: isUpdatingTours,
              onClick: () => {
                updateTours({
                  filter: { provider: provider._id },
                  update: { amenity: amenity._id },
                });
              },
            },
            {
              as: 'button',
              label: t('common:actions.delete'),
              icon: 'trash',
              variant: 'ghost',
              disabled: isDeleting,
              onClick: async () => {
                const { confirmed } = await confirmation(
                  t('account:providers.amenities.texts.confirm_delete', {
                    name: t(`amenities:variants.${amenity.variant}`),
                  })
                );

                if (confirmed) {
                  deleteAmenity({
                    id: amenity._id,
                    providerId: provider._id,
                  });
                }
              },
            },
          ]}
          key={amenity._id}
        />
      ))}
    </InfoBlock>
  );
};

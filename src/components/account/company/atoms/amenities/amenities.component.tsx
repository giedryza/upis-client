import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';
import { routes } from 'config/routes';
import { Button, Tile } from 'ui';
import { formatCurrency } from 'tools/format';
import { ICON_BY_VARIANT, useDeleteAmenity } from 'domain/amenities';
import { useConfirm } from 'domain/confirm';

export const Amenities: VFC = () => {
  const { t, lang } = useTranslation();

  const { confirmation } = useConfirm();

  const { data: company } = useActiveCompany();
  const { mutate: deleteAmenity, isLoading: isDeleting } = useDeleteAmenity();

  if (!company) return null;

  return (
    <InfoBlock
      title={t('account:companies.amenities.title')}
      icon="link"
      columns={2}
    >
      {company.amenities.map((amenity) => (
        <Tile
          title={t(`common:amenities.variants.${amenity.variant}`)}
          subtitle={amenity.info}
          icon={ICON_BY_VARIANT[amenity.variant]}
          fields={[
            {
              label: t('account:companies.amenities.form.amount.display'),
              sublabel: amenity.price
                ? `${formatCurrency(
                    lang,
                    amenity.price.amount,
                    amenity.price.currency
                  )} ${t(`common:amenities.units.${amenity.unit}`)}`
                : t('common:texts.free'),
            },
          ]}
          actions={[
            {
              label: t('common:actions.edit'),
              icon: 'pencil',
              variant: 'secondary',
              url: routes.account.companies.one.amenities.one
                .replace(':id', company._id)
                .replace(':amenityId', amenity._id),
            },
            {
              label: t('common:actions.delete'),
              icon: 'trash',
              variant: 'ghost',
              attributes: {
                disabled: isDeleting,
                onClick: async () => {
                  const { confirmed } = await confirmation(
                    t('account:companies.amenities.texts.confirmDelete', {
                      name: t(`common:amenities.variants.${amenity.variant}`),
                    })
                  );

                  if (confirmed) {
                    deleteAmenity({ id: amenity._id, companyId: company._id });
                  }
                },
              },
            },
          ]}
          key={amenity._id}
        />
      ))}

      <div>
        <Button
          label={t('common:actions.add')}
          variant="tertiary"
          icon="plus"
          size="xs"
          url={routes.account.companies.one.amenities.add.replace(
            ':id',
            company._id
          )}
        />
      </div>
    </InfoBlock>
  );
};

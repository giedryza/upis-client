import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Tile } from 'ui';
import { formatCurrency } from 'tools/format';
import { ICON_BY_VARIANT } from 'domain/amenities';

import { Props } from './amenities.types';
import styles from './amenities.module.scss';

export const BodyAmenities: FC<Props> = ({ amenities }) => {
  const { t, lang } = useTranslation();

  if (!amenities.length) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t('tours:details.amenities.title')}</h2>

      <div className={styles.amenities}>
        {amenities.map((amenity) => (
          <Tile
            title={t(`common:amenities.variants.${amenity.variant}`)}
            subtitle={amenity.info}
            icon={ICON_BY_VARIANT[amenity.variant]}
            fields={[
              {
                label: t('tours:details.amenities.price'),
                sublabel: amenity.price
                  ? `${formatCurrency(
                      lang,
                      amenity.price.amount,
                      amenity.price.currency
                    )} ${t(`common:amenities.units.${amenity.unit}`)}`
                  : t('common:texts.free'),
              },
            ]}
            key={amenity._id}
          />
        ))}
      </div>
    </section>
  );
};

import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { River, rivers, useToursFilters } from 'domain/tours';
import { MultiAutocompleteInput, Pill } from 'ui';

export const FilterRivers: FC = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const { data: filters } = useToursFilters();

  const navigateWithFilters = (value: River[]) => {
    push({ query: { ...query, rivers: value } }, undefined, {
      shallow: true,
    });
  };

  return (
    <Pill
      label={t('serp:filters.rivers.title')}
      title={t('serp:filters.rivers.title')}
      active={Boolean(filters?.rivers?.length)}
      popover={
        <MultiAutocompleteInput
          name="rivers"
          ariaLabel={t('serp:filters.rivers.title')}
          placeholder={t('common:actions.search')}
          items={
            rivers.map((river) => ({
              label: t(`rivers:${river}`),
              value: river,
            })) ?? []
          }
          value={filters?.rivers ?? []}
          onChange={(value) => {
            navigateWithFilters(value as River[]);
          }}
        />
      }
      actions={[
        {
          label: t('common:actions.clear'),
          variant: 'secondary',
          attributes: {
            onClick: () => {
              navigateWithFilters([]);
            },
          },
          closable: true,
        },
      ]}
    />
  );
};

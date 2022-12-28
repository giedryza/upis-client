import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Region, regions, useToursFilters } from 'domain/tours';
import { CheckboxGroupInput, Pill } from 'ui';

export const FilterRegions: FC = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const { data: filters } = useToursFilters();

  const navigateWithFilters = (value: Region[]) => {
    push({ query: { ...query, regions: value } }, undefined, {
      shallow: true,
    });
  };

  return (
    <Pill
      label={t('serp:filters.regions.title')}
      title={t('serp:filters.regions.title')}
      active={Boolean(filters?.regions?.length)}
      popover={
        <CheckboxGroupInput
          ariaLabel={t('serp:filters.regions.title')}
          items={regions.map((region) => ({
            label: t(`regions:${region}`),
            value: region,
          }))}
          value={filters?.regions ?? []}
          onChange={(value) => {
            navigateWithFilters(value as Region[]);
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

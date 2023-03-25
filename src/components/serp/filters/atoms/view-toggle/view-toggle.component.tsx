import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { ButtonGroup } from 'ui';
import { useAppDispatch, useAppSelector } from 'tools/services';
import { selectSerpState, serp, SerpView } from 'domain/serp';

export const ViewToggle: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { view } = useAppSelector(selectSerpState);

  return (
    <ButtonGroup
      ariaLabel={t('serp:filters.viewToggle.title')}
      items={[
        {
          value: 'list',
          label: t('serp:filters.viewToggle.items.list'),
          icon: 'list',
        },
        {
          value: 'map',
          label: t('serp:filters.viewToggle.items.map'),
          icon: 'map',
        },
      ]}
      value={view}
      onChange={(value) => {
        dispatch(serp.actions.setView(value as SerpView));
      }}
    />
  );
};

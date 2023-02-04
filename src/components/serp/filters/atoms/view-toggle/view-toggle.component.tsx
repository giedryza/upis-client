import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { ButtonGroup } from 'ui';
import { useAppDispatch, useAppSelector } from 'tools/services';
import { selectSerpState, serp, SerpView } from 'domain/serp';
import { useBreakpoints } from 'tools/hooks';

export const ViewToggle: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { md } = useBreakpoints();
  const { view } = useAppSelector(selectSerpState);

  const items: Array<{ value: SerpView; label: string }> = [
    { value: 'list', label: t('serp:filters.viewToggle.items.list') },
    { value: 'map', label: t('serp:filters.viewToggle.items.map') },
  ];

  if (!md) return null;

  return (
    <ButtonGroup
      ariaLabel={t('serp:filters.viewToggle.title')}
      items={items}
      value={view}
      onChange={(value) => {
        dispatch(serp.actions.setView(value as SerpView));
      }}
    />
  );
};

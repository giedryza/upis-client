import { useMenuSection, useSeparator } from 'react-aria';

import { MenuItem } from '..';

import { Props } from './menu-section.types';

export const MenuSection = <T extends object>({ section, state }: Props<T>) => {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });
  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li {...separatorProps} />
      )}
      <li {...itemProps}>
        {section.rendered ? (
          <span {...headingProps}>{section.rendered}</span>
        ) : null}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <MenuItem key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
};

import { useMenuSection, useSeparator } from 'react-aria';

import { MenuItem } from '..';

import styles from './menu-section.module.scss';
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
        <li {...separatorProps} className={styles.separator} />
      )}
      <li {...itemProps}>
        {section.rendered ? (
          <div {...headingProps} className={styles.title}>
            {section.rendered}
          </div>
        ) : null}
        <ul {...groupProps} className={styles.section}>
          {[...section.childNodes].map((node) => (
            <MenuItem key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
};

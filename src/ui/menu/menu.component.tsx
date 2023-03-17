import { FC, useMemo } from 'react';
import { Item, Section } from 'react-stately';

import { MenuButton } from './atoms';
import { Props } from './menu.types';

export const Menu: FC<Props> = ({ sections, label, ariaLabel }) => {
  const items = useMemo(
    () =>
      Object.fromEntries(
        sections
          .map((item) => item.items)
          .flat()
          .map((item) => [item.id, item] as const)
      ),
    [sections]
  );

  const disabled = useMemo(
    () =>
      Object.values(items)
        .filter((item) => item.disabled)
        .map((item) => item.id),
    [items]
  );

  return (
    <MenuButton
      label={label}
      ariaLabel={ariaLabel}
      items={sections}
      onAction={(key) => items[key]?.onClick?.()}
      disabledKeys={disabled}
    >
      {(section) => (
        <Section
          items={section.items}
          title={section.label}
          aria-label={section.label}
        >
          {(item) => <Item textValue={item.label}>{item.label}</Item>}
        </Section>
      )}
    </MenuButton>
  );
};

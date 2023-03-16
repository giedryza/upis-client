/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import { FC, forwardRef, useMemo, useRef } from 'react';
import {
  MenuTriggerProps,
  OverlayTriggerState,
  Item,
  Section,
  useMenuTriggerState,
  useTreeState,
  TreeState,
} from 'react-stately';
import {
  AriaMenuProps,
  useMenu,
  useMenuTrigger,
  useButton,
  useMenuItem,
  DismissButton,
  Overlay,
  usePopover,
  AriaPopoverProps,
  AriaButtonProps,
  mergeProps,
  useFocusRing,
  useMenuSection,
  useSeparator,
} from 'react-aria';
import { useObjectRef } from '@react-aria/utils';
import type { Node } from '@react-types/shared';

import { Props } from './menu.types';

interface ButtonProps extends AriaButtonProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);
    const { buttonProps, isPressed: _isPressed } = useButton(props, ref);
    const { focusProps, isFocusVisible: _isFocusVisible } = useFocusRing();

    // const focus = isFocusVisible ? 'ring ring-offset-2 ring-blue-400' : '';

    return (
      <button {...mergeProps(buttonProps, focusProps)} type="button" ref={ref}>
        {props.children}
      </button>
    );
  }
);

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: React.ReactNode;
  state: OverlayTriggerState;
}

const Popover = ({ children, state, ...props }: PopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} style={{ position: 'fixed', inset: 0 }} />
      <div
        {...popoverProps}
        ref={ref}
        style={{
          ...popoverProps.style,
          background: 'lightgray',
          border: '1px solid gray',
        }}
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

interface MenuItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}

const MenuItem = <T extends object>({ item, state }: MenuItemProps<T>) => {
  const ref = useRef<HTMLLIElement>(null);
  const { menuItemProps, isFocused, isDisabled } = useMenuItem(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...menuItemProps}
      ref={ref}
      style={{
        background: isFocused ? 'gray' : 'transparent',
        color: isDisabled ? 'gray' : isFocused ? 'white' : 'black',
        padding: '2px 5px',
        outline: 'none',
        cursor: 'default',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {item.rendered}
    </li>
  );
};

interface MenuSectionProps<T> {
  section: Node<T>;
  state: TreeState<T>;
}

const MenuSection = <T extends object>({
  section,
  state,
}: MenuSectionProps<T>) => {
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
          <span
            {...headingProps}
            style={{
              fontWeight: 'bold',
              fontSize: '1.1em',
              padding: '2px 5px',
            }}
          >
            {section.rendered}
          </span>
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

const Dropdown = <T extends object>(props: AriaMenuProps<T>) => {
  const ref = useRef(null);

  const state = useTreeState(props);
  const { menuProps } = useMenu(props, state, ref);

  return (
    <ul
      {...menuProps}
      ref={ref}
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        width: 150,
      }}
    >
      {[...state.collection].map((item) =>
        item.type === 'section' ? (
          <MenuSection key={item.key} section={item} state={state} />
        ) : (
          <MenuItem key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  );
};

interface MenuButtonProps<T> extends AriaMenuProps<T>, MenuTriggerProps {
  label?: string;
  ariaLabel?: string;
}

const MenuButton = <T extends object>(props: MenuButtonProps<T>) => {
  const ref = useRef<HTMLButtonElement>(null);

  const state = useMenuTriggerState({ ...props, isOpen: true });
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

  return (
    <>
      <Button {...menuTriggerProps} aria-label={props.ariaLabel} ref={ref}>
        {props.label ? props.label : null}
      </Button>

      {state.isOpen ? (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <Dropdown {...props} {...menuProps} />
        </Popover>
      ) : null}
    </>
  );
};

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

/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, useMultipleSelection } from 'downshift';

import { normalizeString } from 'tools/common';

import { Props, Item } from './multi-autocomplete-input.types';
import styles from './multi-autocomplete-input.module.scss';

export const MultiAutocompleteInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      ariaLabel,
      items,
      value,
      onChange,
      placeholder,
      error,
      autofocus,
      expanded,
      variant = 'neutral',
    },
    forwardedRef
  ) => {
    const [query, setQuery] = useState('');

    const initialItems = useMemo(
      () => items.filter((item) => value.includes(item.value)),
      [items, value]
    );

    const {
      getSelectedItemProps,
      getDropdownProps,
      addSelectedItem,
      removeSelectedItem,
      selectedItems,
    } = useMultipleSelection<Item>({
      selectedItems: initialItems,
      onSelectedItemsChange: (changes) => {
        onChange(changes.selectedItems?.map((item) => item.value) ?? []);
      },
    });

    const filteredItems = useMemo(
      () =>
        items
          .filter((item) => !selectedItems.includes(item))
          .filter((item) =>
            normalizeString(item.label).includes(normalizeString(query))
          ),
      [query, items, selectedItems]
    );

    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox<Item>({
      isOpen: expanded,
      id: name,
      items: filteredItems,
      itemToString: (item) => item?.label ?? '',
      defaultHighlightedIndex: 0,
      selectedItem: null,
      stateReducer: (state, { changes, type }) => {
        switch (type) {
          case useCombobox.stateChangeTypes.InputBlur:
            return {
              ...changes,
              isOpen: !!changes.selectedItem,
              inputValue: '',
            };
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              inputValue: '',
            };
          // after selecting dropdown item with keyboard, the following first input change gets overridden with empty string from this event
          // returning state prevents this behaviour
          case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
            return state;
          default:
            return changes;
        }
      },
      onInputValueChange: ({ inputValue = '' }) => {
        setQuery(inputValue);
      },
      onStateChange: (changes) => {
        switch (changes.type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            if (changes.selectedItem) {
              addSelectedItem(changes.selectedItem);
            }
            break;
          default:
            break;
        }
      },
    });

    return (
      <div className={clsx(styles.autocomplete, styles[`-variant-${variant}`])}>
        {label ? (
          <label className={styles.label} {...getLabelProps()}>
            {label}
          </label>
        ) : null}

        <div className={clsx(styles.input, !!error && styles.invalid)}>
          <div className={styles.items}>
            {selectedItems.map((item, i) => (
              <div
                className={styles.pill}
                key={item.value}
                {...getSelectedItemProps({ selectedItem: item, index: i })}
              >
                <span>{item.label}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelectedItem(item);
                  }}
                  className={styles.pressable}
                  type="button"
                >
                  &#10005;
                </button>
              </div>
            ))}
            <div className={styles.wrapper}>
              <input
                {...getInputProps(
                  getDropdownProps({
                    placeholder,
                    preventKeyAction: isOpen,
                    autoFocus: autofocus,
                    'aria-invalid': !!error,
                    'aria-label': ariaLabel,
                    ref: forwardedRef,
                  })
                )}
              />
              {isOpen ? null : (
                <button
                  aria-label="toggle menu"
                  type="button"
                  className={clsx(styles.pressable, styles.inverted)}
                  {...getToggleButtonProps()}
                >
                  &#8595;
                </button>
              )}
            </div>
          </div>

          <ul
            {...getMenuProps()}
            className={clsx(styles.dropdown, 'scrollbar-primary', {
              'visually-hidden': !isOpen || !filteredItems.length,
              [String(styles.expanded)]: expanded,
            })}
          >
            {isOpen
              ? filteredItems.map((item, i) => (
                  <li
                    className={clsx(
                      styles.item,
                      highlightedIndex === i && styles.active,
                      selectedItem === item && styles.selected
                    )}
                    key={item.value}
                    {...getItemProps({ item, index: i })}
                  >
                    <span>{item.label}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>

        {!!error && <small className={styles.error}>{error}</small>}
      </div>
    );
  }
);

MultiAutocompleteInput.displayName = 'MultiAutocompleteInput';

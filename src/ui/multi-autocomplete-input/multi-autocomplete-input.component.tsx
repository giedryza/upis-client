/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, useMultipleSelection } from 'downshift';

import { Props, Item } from './multi-autocomplete-input.types';
import styles from './multi-autocomplete-input.module.scss';

export const MultiAutocompleteInput = forwardRef<HTMLInputElement, Props>(
  ({ name, label, items, value, onChange }, forwardedRef) => {
    const [query, setQuery] = useState('');

    const {
      getSelectedItemProps,
      getDropdownProps,
      addSelectedItem,
      removeSelectedItem,
      selectedItems,
    } = useMultipleSelection<Item>({
      initialSelectedItems: items.filter((item) => value.includes(item.value)),
      onSelectedItemsChange: (changes) => {
        onChange(changes.selectedItems ?? []);
      },
    });

    const filteredItems = useMemo(
      () =>
        items
          .filter((item) => !selectedItems.includes(item))
          .filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase())
          ),
      [query, items, selectedItems]
    );

    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox<Item>({
      id: name,
      items: filteredItems,
      itemToString: (item) => item?.label ?? '',
      defaultHighlightedIndex: 0,
      selectedItem: null,
      stateReducer: (_state, { changes, type }) => {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
          case useCombobox.stateChangeTypes.InputBlur:
            return {
              ...changes,
              isOpen: !!changes.selectedItem,
            };
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
      <div className={styles.autocomplete}>
        <label className={styles.label} {...getLabelProps()}>
          {label}
        </label>

        <div className={styles.input}>
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
            <div className={styles.wrapper} {...getComboboxProps()}>
              <input
                {...getInputProps(
                  getDropdownProps({
                    preventKeyAction: isOpen,
                    ref: forwardedRef,
                  })
                )}
              />
              <button
                aria-label="toggle menu"
                type="button"
                className={clsx(styles.pressable, styles.inverted)}
                {...getToggleButtonProps()}
              >
                &#8595;
              </button>
            </div>
          </div>

          <ul
            {...getMenuProps()}
            className={clsx(styles.dropdown, {
              'visually-hidden': !isOpen || !filteredItems.length,
            })}
          >
            {isOpen &&
              filteredItems.map((item, i) => (
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
              ))}
          </ul>
        </div>
      </div>
    );
  }
);

MultiAutocompleteInput.displayName = 'MultiAutocompleteInput';

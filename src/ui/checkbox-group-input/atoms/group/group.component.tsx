import { FC, PropsWithChildren } from 'react';
import { useCheckboxGroup } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';

import { CheckboxContextProvider } from '../../checkbox-group-input.context';

import { Props } from './group.types';
import styles from './group.module.scss';

export const Group: FC<PropsWithChildren<Props>> = ({
  label,
  value,
  onChange,
  info,
  error,
  disabled,
  readonly,
  children,
}) => {
  const props: Parameters<typeof useCheckboxGroup>[0] = {
    label,
    value,
    onChange,
    isDisabled: disabled,
    isReadOnly: readonly,
    description: info,
    errorMessage: error,
    validationState: error ? 'invalid' : 'valid',
  };

  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state);

  return (
    <div {...groupProps} className={styles.group}>
      {!!label && (
        <span {...labelProps} className={styles.label}>
          {label}
        </span>
      )}

      <CheckboxContextProvider value={state}>
        <div className={styles.group}>{children}</div>
      </CheckboxContextProvider>

      {!!info && (
        <small {...descriptionProps} data-help="info">
          {info}
        </small>
      )}

      {!!error && (
        <small {...errorMessageProps} data-help="error">
          {error}
        </small>
      )}
    </div>
  );
};

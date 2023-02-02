import { FC, PropsWithChildren } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { ButtonGroupContextProvider } from '../../button-group.context';

import { Props } from './group.types';
import styles from './group.module.scss';

export const Group: FC<PropsWithChildren<Props>> = ({
  label,
  ariaLabel,
  name,
  value,
  onChange,
  info,
  error,
  disabled,
  children,
}) => {
  const props: Parameters<typeof useRadioGroup>[0] = {
    label,
    'aria-label': ariaLabel,
    name,
    value,
    onChange,
    isDisabled: disabled,
    description: info,
    errorMessage: error,
    validationState: error ? 'invalid' : 'valid',
  };

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} className={styles.container}>
      {!!label && (
        <span {...labelProps} className={styles.label}>
          {label}
        </span>
      )}

      <ButtonGroupContextProvider value={state}>
        <div className={styles.group}>{children}</div>
      </ButtonGroupContextProvider>

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

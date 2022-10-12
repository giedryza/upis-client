import { FC } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { RadioContextProvider } from '../../radio-input.context';

import { Props } from './group.types';
import styles from './group.module.scss';

export const Group: FC<Props> = ({
  label,
  name,
  value,
  onChange,
  error,
  disabled,
  readonly,
  children,
}) => {
  const props: Parameters<typeof useRadioGroup>[0] = {
    label,
    name,
    value,
    onChange,
    isDisabled: disabled,
    isReadOnly: readonly,
    errorMessage: error,
    validationState: error ? 'invalid' : 'valid',
  };

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, errorMessageProps } = useRadioGroup(
    props,
    state
  );

  return (
    <div {...radioGroupProps} className={styles.group}>
      {!!label && (
        <span {...labelProps} className={styles.label}>
          {label}
        </span>
      )}

      <RadioContextProvider value={state}>
        <div className={styles.group}>{children}</div>
      </RadioContextProvider>

      {!!error && <small {...errorMessageProps}>{error}</small>}
    </div>
  );
};

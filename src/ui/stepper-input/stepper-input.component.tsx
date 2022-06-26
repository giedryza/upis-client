import { VFC } from 'react';

import { Props } from './stepper-input.types';
import styles from './stepper-input.module.scss';

export const StepperInput: VFC<Props> = ({ label }) => {
  return <div className={styles.input}>{label}</div>;
};

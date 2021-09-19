import { VFC } from 'react';

import styles from './form-steps.module.scss';
import { Props, Step } from './form-steps.types';

const FormSteps: VFC<Props> = ({ total, current }) => {
  return (
    <div className={styles.container}>
      <ul>
        {Array.from({ length: total }, (_, i) => (
          <li
            aria-label={
              i + 1 === current
                ? Step.Current
                : i + 1 < current
                ? Step.Completed
                : undefined
            }
            key={i}
          />
        ))}
      </ul>
    </div>
  );
};

export { FormSteps };

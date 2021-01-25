import { FC } from 'react';

import styles from './form-steps.module.scss';

enum Step {
  Current = 'current',
  Completed = 'completed',
}

interface Props {
  total: number;
  current: number;
}

const FormSteps: FC<Props> = ({ total, current }) => {
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

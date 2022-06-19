import { useState, VFC } from 'react';
import clsx from 'clsx';

import { useAppDispatch } from 'tools/services/store';
import { useTimeout } from 'tools/hooks';
import { Toast } from 'ui';
import { alerts } from 'domain/alerts';

import { Props } from './alert.types';
import { ALERT_FADE_DELAY, SAFETY_OFFSET } from './alert.constants';
import styles from './alert.module.scss';

export const Alert: VFC<Props> = ({ id, type, message }) => {
  const dispatch = useAppDispatch();

  const [isFading, setIsFading] = useState(true);

  useTimeout(
    () => dispatch(alerts.actions.close(id)),
    isFading ? ALERT_FADE_DELAY - SAFETY_OFFSET : null
  );

  return (
    <div
      className={clsx(isFading && styles.fading)}
      style={{
        '--fade-delay': ALERT_FADE_DELAY,
      }}
      role="alert"
    >
      <Toast
        type={type}
        message={message}
        onMouseEnter={() => setIsFading(false)}
        onMouseLeave={() => setIsFading(true)}
        onTouchStart={() => setIsFading(false)}
        onTouchEnd={() => setIsFading(true)}
        onClose={() => {
          setIsFading(false);
          dispatch(alerts.actions.close(id));
        }}
      />
    </div>
  );
};

import { FC } from 'react';

import { Props } from './file-icon.types';
import styles from './file-icon.module.scss';

export const FileIcon: FC<Props> = ({ type }) => {
  return (
    <svg className={styles.container} viewBox="0 0 349.34 385.67">
      <path
        className={styles.backdrop}
        d="M158.4,57.17A22.42,22.42,0,0,0,136,79.58V420.42a22.42,22.42,0,0,0,22.42,22.42H402.25a22.42,22.42,0,0,0,22.42-22.42V139.67l-82.5-82.5Z"
        transform="translate(-75.33 -57.17)"
      />
      <path
        className={styles.flap}
        d="M364.59,139.67h60.08L383.42,98.42,342.17,57.17v60.08A22.42,22.42,0,0,0,364.59,139.67Z"
        transform="translate(-75.33 -57.17)"
      />
      {!!type && (
        <>
          <rect
            className={styles.banner}
            y="171.83"
            width="289.33"
            height="145.33"
            rx="14.22"
            ry="14.22"
          />
          <text
            className={styles.text}
            textAnchor="middle"
            transform="translate(144, 277.5)"
          >
            {type}
          </text>
        </>
      )}
    </svg>
  );
};

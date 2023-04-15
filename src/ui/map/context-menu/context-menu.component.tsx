import { FC, useState } from 'react';

import { Point } from 'ui';

import { Props } from './context-menu.types';
import styles from './context-menu.module.scss';

export const ContextMenu: FC<Props> = ({ useMapEvents, Popup, items }) => {
  const [point, setPoint] = useState<Point | null>(null);

  useMapEvents({
    contextmenu: ({ latlng }) => {
      setPoint(latlng);
    },
  });

  return point ? (
    <Popup position={point} closeButton={false} className={styles.menu}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.label}>
            <button
              className={styles.button}
              type="button"
              onClick={() => {
                item.onClick(point);
                setPoint(null);
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </Popup>
  ) : null;
};

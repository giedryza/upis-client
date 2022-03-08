import { VFC } from 'react';

import { Props } from './table.types';
import styles from './table.module.scss';

export const Table: VFC<Props> = ({ rows, columns }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(({ accessor, label, align = 'left' }) => {
            return (
              <th className={styles[`-align-${align}`]} key={`${accessor}`}>
                {label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row.id}>
              {columns.map(({ accessor, align = 'left' }) => {
                return (
                  <td className={styles[`-align-${align}`]} key={`${accessor}`}>
                    {row.content[accessor]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

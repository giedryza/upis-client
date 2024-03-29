import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Icon } from 'ui';

import { Props } from './table.types';
import styles from './table.module.scss';

export const Table: FC<Props> = ({ rows, columns }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(({ accessor, label, align = 'left' }) => {
              return (
                <th className={styles[`-align-${align}`]} key={accessor}>
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row) => {
              return (
                <tr key={row.id}>
                  {columns.map(({ accessor, align = 'left' }) => {
                    return (
                      <td className={styles[`-align-${align}`]} key={accessor}>
                        {row.content[accessor]}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                <Icon name="file" className={styles.icon} />
                <span>{t('common:components.table.empty')}</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

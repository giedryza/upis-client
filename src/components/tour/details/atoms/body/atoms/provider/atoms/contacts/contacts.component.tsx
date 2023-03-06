import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { formatLanguage, formatList } from 'tools/format';
import { Icon } from 'ui';

import { Props } from './contacts.types';
import styles from './contacts.module.scss';

export const ProviderContacts: FC<Props> = ({ phone, email, languages }) => {
  const { t, lang } = useTranslation();

  return (
    <ul className={styles.contacts}>
      {phone ? (
        <li className={styles.contact}>
          <Icon name="mobile" className={styles.icon} />
          <span className={styles.label}>
            {t('tours:provider.phone.title')}
          </span>
          <a href={`tel:${phone}`}>{phone}</a>
        </li>
      ) : null}

      {email ? (
        <li className={styles.contact}>
          <Icon name="price" className={styles.icon} />
          <span className={styles.label}>
            {t('tours:provider.email.title')}
          </span>
          <a href={`mailto:${email}`}>{email}</a>
        </li>
      ) : null}

      {languages.length ? (
        <li className={styles.contact}>
          <Icon name="lock" className={styles.icon} />
          <span className={styles.label}>
            {t('tours:provider.languages.title')}
          </span>
          <span>
            {formatList(
              lang,
              languages.map((language) => formatLanguage(lang, language))
            )}
          </span>
        </li>
      ) : null}
    </ul>
  );
};

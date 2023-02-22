import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { formatLanguage, formatList } from 'tools/format';
import { toExternalLink } from 'tools/common';
import { Icon } from 'ui';

import { Props } from './contacts.types';
import styles from './contacts.module.scss';

export const SidebarContacts: FC<Props> = ({
  phone,
  email,
  website,
  languages,
}) => {
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

      {website ? (
        <li className={styles.contact}>
          <Icon name="globe" className={styles.icon} />
          <span className={styles.label}>
            {t('tours:provider.website.title')}
          </span>
          <a href={toExternalLink(website)} target="_blank" rel="noreferrer">
            {website}
          </a>
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

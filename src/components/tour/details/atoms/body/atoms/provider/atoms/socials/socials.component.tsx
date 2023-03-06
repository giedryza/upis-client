import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';
import { ICON_BY_SOCIAL_LINK_TYPE } from 'domain/providers';

import { Props } from './socials.types';
import styles from './socials.module.scss';

export const ProviderSocials: FC<Props> = ({ socials }) => {
  const { t } = useTranslation();

  return socials.length ? (
    <ul className={styles.socials}>
      {socials.map((social) => (
        <li key={social._id}>
          <Button
            as="external"
            icon={ICON_BY_SOCIAL_LINK_TYPE[social.type]}
            variant="secondary"
            href={social.url}
            aria-label={t(`socials:${social.type}`)}
          />
        </li>
      ))}
    </ul>
  ) : null;
};

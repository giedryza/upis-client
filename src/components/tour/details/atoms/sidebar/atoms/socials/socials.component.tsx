import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';
import { ICON_BY_SOCIAL_LINK_TYPE } from 'domain/social-links';

import { Props } from './socials.types';
import styles from './socials.module.scss';

export const SidebarSocials: FC<Props> = ({ socialLinks }) => {
  const { t } = useTranslation();

  return socialLinks.length ? (
    <ul className={styles.socials}>
      {socialLinks.map((socialLink) => (
        <li key={socialLink._id}>
          <Button
            as="external"
            icon={ICON_BY_SOCIAL_LINK_TYPE[socialLink.type]}
            variant="secondary"
            href={socialLink.url}
            aria-label={t(`socials:${socialLink.type}`)}
          />
        </li>
      ))}
    </ul>
  ) : null;
};

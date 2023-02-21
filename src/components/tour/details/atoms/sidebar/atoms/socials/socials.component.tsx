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
            icon={ICON_BY_SOCIAL_LINK_TYPE[socialLink.type]}
            variant="secondary"
            url={socialLink.url}
            attributes={{
              'aria-label': t(`common:social.${socialLink.type}`),
            }}
          />
        </li>
      ))}
    </ul>
  ) : null;
};

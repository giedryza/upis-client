import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';
import { ICON_BY_SOCIAL_LINK_TYPE } from 'domain/providers';

import { Props } from './socials.types';
import styles from './socials.module.scss';

export const SidebarSocials: FC<Props> = ({ socials }) => {
  const { t } = useTranslation();

  return socials.length ? (
    <ul className={styles.socials}>
      {socials.map((socialLink) => (
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

import { FC } from 'react';
import Link from 'next/link';

import styles from './company-card.module.scss';

import { Button } from 'ui/button/button.component';
import { Icon, IconName } from 'ui/icon/icon.component';
import { Social, SocialType } from 'domain/companies/companies.types';
import { AnchorLink } from 'ui/anchor-link/anchor-link.component';

const socialNameByType: Record<SocialType, string> = {
  [SocialType.Facebook]: 'Facebook',
  [SocialType.Instagram]: 'Instagram',
  [SocialType.Youtube]: 'Youtube',
  [SocialType.Linkedin]: 'Linkedin',
  [SocialType.Twitter]: 'Twitter',
};

const socialIconByType: Record<SocialType, IconName> = {
  [SocialType.Facebook]: IconName.Facebook,
  [SocialType.Instagram]: IconName.Instagram,
  [SocialType.Youtube]: IconName.Youtube,
  [SocialType.Linkedin]: IconName.Linkedin,
  [SocialType.Twitter]: IconName.Twitter,
};

interface Props {
  logo: string;
  name: string;
  toursTotal: number;
  slug: string;
  website?: string;
  socials?: Social[];
}

const CompanyCard: FC<Props> = ({
  logo,
  name,
  toursTotal,
  website,
  socials = [],
  slug,
}) => {
  const companyUrl = `/companies/${encodeURIComponent(slug)}`;

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Link href={companyUrl}>
          <a className={styles.logoContainer} tabIndex={-1}>
            <img className={styles.logo} src={logo} alt={name} />
          </a>
        </Link>

        <h3 className={styles.title}>
          <Link href={companyUrl}>
            <a>{name}</a>
          </Link>
        </h3>
      </header>

      <ul className={styles.meta}>
        <li className={styles.metaItem}>
          <Icon name={IconName.Path} className={styles.icon} />
          <Link href="/tours">
            <a>{toursTotal} maršrutai</a>
          </Link>
        </li>
        {website && (
          <li className={styles.metaItem}>
            <Icon name={IconName.Globe} className={styles.icon} />
            <AnchorLink href={website} label={website} target="_blank" />
          </li>
        )}
      </ul>

      <footer className={styles.footer}>
        <ul className={styles.social}>
          {socials.map((social) => (
            <li key={social._id}>
              <Button
                icon={socialIconByType[social.type]}
                ariaLabel={socialNameByType[social.type]}
                title={socialNameByType[social.type]}
                url={social.link}
                target="_blank"
                styleType="secondary"
                size="xs"
              />
            </li>
          ))}
        </ul>

        <Button
          icon={IconName.ChevronRight}
          iconPlacement="right"
          label="Plačiau"
          url={companyUrl}
          styleType="text"
          size="sm"
        />
      </footer>
    </article>
  );
};

export { CompanyCard };

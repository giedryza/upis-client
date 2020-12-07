import Link from 'next/link';

import styles from './company-card.module.scss';

import { Button } from 'ui/button/button.component';
import { Icon, IconName } from 'ui/icon/icon.component';

const CompanyCard = () => {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Link href="/tours">
          <a className={styles.logoContainer} tabIndex={-1}>
            <img
              className={styles.logo}
              src="https://www.pipirobaidares.lt/wp-content/uploads/2018/06/pipiro-baidares.png"
              alt=""
            />
          </a>
        </Link>

        <h3 className={styles.title}>
          <Link href="/tours">
            <a>Pipiro baidarės</a>
          </Link>
        </h3>
      </header>

      <ul className={styles.meta}>
        <li className={styles.metaItem}>
          <Icon name={IconName.Path} className={styles.icon} />
          <Link href="/tours">
            <a>8 maršrutai</a>
          </Link>
        </li>
        <li className={styles.metaItem}>
          <Icon name={IconName.Globe} className={styles.icon} />
          <a
            href="https://www.pipirobaidares.lt"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.pipirobaidares.lt
          </a>
        </li>
      </ul>

      <footer className={styles.footer}>
        <ul className={styles.social}>
          <li>
            <Button
              iconRight={IconName.Facebook}
              ariaLabel="Facebook"
              title="Facebook"
              styleType="secondary"
              size="xs"
            />
          </li>
          <li>
            <Button
              iconRight={IconName.Instagram}
              ariaLabel="Instagram"
              title="Instagram"
              styleType="secondary"
              size="xs"
            />
          </li>
          <li>
            <Button
              iconRight={IconName.Youtube}
              ariaLabel="Youtube"
              title="Youtube"
              styleType="secondary"
              size="xs"
            />
          </li>
          <li>
            <Button
              iconRight={IconName.Linkedin}
              ariaLabel="Linkedin"
              title="Linkedin"
              styleType="secondary"
              size="xs"
            />
          </li>
          <li>
            <Button
              iconRight={IconName.Twitter}
              ariaLabel="Twitter"
              title="Twitter"
              styleType="secondary"
              size="xs"
            />
          </li>
        </ul>

        <Button
          iconRight={IconName.ChevronRight}
          label="More"
          styleType="text"
          size="sm"
        />
      </footer>
    </article>
  );
};

export { CompanyCard };

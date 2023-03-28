import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { useSession } from 'next-auth/react';

import { Container, Divider, SelectInput } from 'ui';
import { cookies, generateUrl } from 'tools/services';
import { capitalize } from 'tools/common';
import { APP, CookieName, routes } from 'config';
import { Locale } from 'types/common';
import { formatLanguage } from 'tools/format';
import { useIsNavigating } from 'tools/hooks';

import styles from './footer.module.scss';

export const Footer: FC = () => {
  const { t } = useTranslation();
  const { locale: currentLocale, asPath, pathname, query, push } = useRouter();
  const { isNavigating } = useIsNavigating();

  const { status, data: session } = useSession();

  const NAVIGATION: Array<{
    title: string;
    links: Array<{ label: string; url: string }>;
  }> = [
    {
      title: t('common:layout.menu.account'),
      links:
        status !== 'authenticated'
          ? [
              {
                label: t('common:layout.menu.signin'),
                url: generateUrl(routes.auth.signin),
              },
            ]
          : session.user.role === 'user'
          ? [
              {
                label: t('common:layout.menu.profile'),
                url: generateUrl(routes.account.profile.index),
              },
            ]
          : session.user.role === 'manager'
          ? [
              {
                label: t('common:layout.menu.profile'),
                url: generateUrl(routes.account.profile.index),
              },
              {
                label: t('common:layout.menu.providers'),
                url: generateUrl(routes.account.providers.index),
              },
              {
                label: t('common:layout.menu.tours'),
                url: generateUrl(routes.account.tours.index),
              },
            ]
          : session.user.role === 'admin'
          ? [
              {
                label: t('common:layout.menu.profile'),
                url: generateUrl(routes.account.profile.index),
              },
              {
                label: t('common:layout.menu.providers'),
                url: generateUrl(routes.account.providers.index),
              },
              {
                label: t('common:layout.menu.tours'),
                url: generateUrl(routes.account.tours.index),
              },
            ]
          : [],
    },
    {
      title: t('common:layout.footer.sections.contacts.title'),
      links: [{ label: APP.mail.index, url: `mailto:${APP.mail.index}` }],
    },
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.body}>
          <div className={styles.main}>
            <nav
              className={styles.navigation}
              aria-label={t('common:layout.footer.nav')}
            >
              <ul className={styles.groups}>
                {NAVIGATION.map((group, index) => (
                  <li className={styles.group} key={index}>
                    <h5 className={styles.title}>{group.title}</h5>
                    <ul className={styles.links}>
                      {group.links.map((link, i) => (
                        <li className={styles.link} key={i}>
                          <Link href={link.url}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.language}>
              <SelectInput
                label={t('common:layout.footer.language')}
                name="language"
                options={Object.values(Locale).map((locale) => ({
                  label: capitalize(formatLanguage(locale, locale)),
                  value: locale,
                }))}
                value={currentLocale}
                onChange={({ target }) => {
                  cookies.set(CookieName.Language, target.value);
                  push({ pathname, query }, asPath, { locale: target.value });
                }}
                disabled={isNavigating}
              />
            </div>
          </div>

          <Divider />

          <div className={styles.legal}>
            <p className={styles.copy}>
              {t('common:layout.footer.legal', {
                year: new Date().getFullYear(),
                name: APP.name,
              })}
            </p>
            <p className={styles.author}>
              <Trans
                i18nKey="common:layout.footer.credentials"
                components={[
                  <a
                    href="https://giedrius.io"
                    target="_blank"
                    rel="noreferrer"
                    key="credentials"
                  >
                    placeholder
                  </a>,
                ]}
              />
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

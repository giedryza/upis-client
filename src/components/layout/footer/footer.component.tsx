import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { useSession } from 'next-auth/react';

import { Container, Divider, Menu } from 'ui';
import { cookies, generateUrl } from 'tools/services';
import { capitalize } from 'tools/common';
import { APP, CookieName, routes } from 'config';
import { Locale } from 'types/common';
import { formatLanguage } from 'tools/format';

import styles from './footer.module.scss';

export const Footer: FC = () => {
  const { t } = useTranslation();
  const { locale, asPath, pathname, query, push } = useRouter();

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
          : ['user', 'pending'].includes(session.user.role)
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
                    <h4 className={styles.title}>{group.title}</h4>
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
          </div>

          <Divider />

          <div className={styles.legal}>
            <p className={styles.copy}>
              {t('common:layout.footer.legal', {
                year: new Date().getFullYear(),
                name: APP.name,
              })}
              {' | '}
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

            <Menu
              label={
                locale
                  ? capitalize(formatLanguage(locale, locale))
                  : t('common:layout.language.languages')
              }
              sections={[
                {
                  id: 'languages',
                  label: t('common:layout.language.languages'),
                  items: Object.values(Locale).map((code) => ({
                    id: code,
                    label: capitalize(formatLanguage(code, code)),
                    icon: locale === code ? 'tick' : undefined,
                    onClick: () => {
                      cookies.set(CookieName.Language, code);
                      push({ pathname, query }, asPath, { locale: code });
                    },
                  })),
                },
              ]}
              icon="language"
              size="sm"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
};

import { IconName } from 'ui';
import { routes } from 'config/routes';

export const LINKS = [
  {
    label: 'account:profile.title',
    icon: IconName.User,
    url: routes.account.profile,
  },
  {
    label: 'account:company.title',
    icon: IconName.Kayak,
    url: routes.account.company,
  },
  {
    label: 'account:tours.title',
    icon: IconName.Path,
    url: routes.account.tours,
  },
];

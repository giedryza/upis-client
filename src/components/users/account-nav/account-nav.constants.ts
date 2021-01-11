import { IconName } from 'ui/icon/icon.component';
import { routes } from 'uri/routes';

export const LINKS = [
  {
    label: 'users:profile.title',
    icon: IconName.User,
    url: routes.users.profile,
  },
  {
    label: 'users:company.title',
    icon: IconName.Kayak,
    url: routes.users.company,
  },
  {
    label: 'users:tours.title',
    icon: IconName.Path,
    url: routes.users.tours,
  },
];

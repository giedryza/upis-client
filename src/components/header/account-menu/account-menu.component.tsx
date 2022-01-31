import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { IconName } from 'ui/icon';
import { Dropdown } from 'components/dropdown/dropdown.container';
import { List } from 'components/dropdown/list/list.container';
import { Button } from 'ui/button/button.component';
import { routes } from 'uri/routes';
import { Http } from 'tools/libs/http/http.lib';
import { endpoints } from 'uri/endpoints';
import { Errors } from 'tools/libs/errors/errors.lib';
import { getUser } from 'domain/auth/auth.selectors';
import { actions } from 'domain/actions';

const AccountMenu: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const signout = async () => {
    try {
      await new Http(endpoints.users.signout).post();

      dispatch(actions.auth.clearSession());

      Router.push(routes.home);
    } catch (error: unknown) {
      new Errors(error).handleApi();
    }
  };

  return user ? (
    <Dropdown
      id={DropdownKey.AccountMenu}
      position="bottom-right"
      menuButton={{
        label: t('common:account.account'),
        icon: IconName.Account,
        variant: 'ghost',
        size: 'sm',
        withDropdown: true,
      }}
    >
      <List
        id={DropdownKey.AccountMenu}
        items={[
          {
            label: t('common:account.profile'),
            icon: IconName.User,
            url: routes.users.profile,
          },
          {
            label: t('common:account.signout'),
            icon: IconName.Exit,
            onClick: signout,
          },
        ]}
      />
    </Dropdown>
  ) : (
    <Button
      label={t('common:account.signin')}
      icon={IconName.Account}
      variant="ghost"
      size="sm"
      url={routes.users.signin}
    />
  );
};

export { AccountMenu };

import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { IconName } from 'ui/icon/icon.types';
import { Dropdown } from 'components/dropdown/dropdown.container';
import { List } from 'components/dropdown/list/list.container';
import { authActions } from 'domain/auth/auth.actions';
import { Button } from 'ui/button/button.component';
import { routes } from 'uri/routes';
import { Http } from 'utils/libs/http/http.lib';
import { endpoints } from 'uri/endpoints';
import { Errors } from 'utils/libs/errors/errors.lib';
import { getUser } from 'domain/auth/auth.selectors';

const AccountMenu: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const signout = async () => {
    try {
      await new Http(endpoints.users.signout).post();

      dispatch(authActions.clearSession());

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
        label: user.email,
        icon: IconName.Account,
        styleType: 'ghost',
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
      styleType="ghost"
      url={routes.users.signin}
    />
  );
};

export { AccountMenu };

import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';

import { EditInfo } from 'components/editable-info/edit-info.component';
import { TextInput } from 'ui/text-input';
import { ValidationRules } from 'types/common/forms';
import { Errors } from 'tools/libs/errors/errors.lib';
import { IconName } from 'ui/icon';

import styles from './edit-password.module.scss';

interface Values {
  password: string;
  confirmPassword: string;
}

const INITIAL_VALUES: Values = {
  password: '',
  confirmPassword: '',
};

interface Props {
  id: string;
}

const EditPassword: FC<Props> = ({ id }) => {
  const { t } = useTranslation();

  const { register, handleSubmit, formState } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    mode: 'onChange',
  });

  const { isSubmitting, isValidating, isSubmitted, isValid, errors } =
    formState;

  const validation: ValidationRules<Values> = {
    password: {
      required: {
        value: true,
        message: t('users:errors.password.empty'),
      },
      minLength: {
        value: 8,
        message: t('users:errors.password.length'),
      },
      maxLength: {
        value: 50,
        message: t('users:errors.password.length'),
      },
    },
    confirmPassword: {
      required: {
        value: true,
        message: t('users:errors.password.confirm'),
      },
    },
  };

  const onSubmit = async ({ password, confirmPassword }: Values) => {
    try {
      // const { data } = await new Http<Response<Session>>(
      //   endpoints.users.signin,
      //   {
      //     body: { email, password },
      //   }
      // ).post();

      // dispatch(actions.auth.setSession(data));
      console.log({ password, confirmPassword });
    } catch (error: unknown) {
      new Errors(error).handleApi();
    }
  };

  const form = (
    <form className={styles.form} id={id} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register('password', { ...validation.password })}
        label={t('users:form.password')}
        error={isSubmitted ? errors.password?.message : ''}
      />
      <TextInput
        {...register('confirmPassword', { ...validation.confirmPassword })}
        label={t('users:form.confirmPassword')}
        error={isSubmitted ? errors.confirmPassword?.message : ''}
      />
    </form>
  );

  const passwordPlaceholder = Array.from({ length: 8 }).fill('\u2217').join('');

  return (
    <EditInfo
      id={id}
      label={t('users:form.password')}
      value={passwordPlaceholder}
      form={form}
      isValid={!isSubmitting && !isValidating && (!isSubmitted || isValid)}
      icon={IconName.Lock}
    />
  );
};

export { EditPassword };

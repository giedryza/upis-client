import { FC } from 'react';

import { isDefined } from 'utils/common/is-defined';

const APP_NAME = 'Upis.lt';
const APP_SLOGAN = 'Baidarių maršrutai ir nuoma Lietuvoje';

interface Props {
  title?: string;
}

const Title: FC<Props> = ({ title }) => {
  const appTitle = [APP_NAME, title, APP_SLOGAN].filter(isDefined).join(' | ');

  return <title>{appTitle}</title>;
};

export { Title };

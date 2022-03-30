import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Props } from './portal.types';

export const Portal: FC<Props> = ({ children, id }) => {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    const el = document.getElementById(id);

    setElement(el);
  }, [id]);

  return element ? createPortal(children, element) : null;
};

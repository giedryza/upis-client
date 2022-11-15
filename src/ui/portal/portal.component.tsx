import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Props } from './portal.types';

export const Portal: FC<PropsWithChildren<Props>> = ({ children, id }) => {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    const el = document.getElementById(id);

    setElement(el);
  }, [id]);

  return element ? createPortal(children, element) : null;
};

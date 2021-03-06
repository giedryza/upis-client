import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  selector: string;
}

const Portal: FC<Props> = ({ children, selector }) => {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    const el = document.querySelector(selector);

    setElement(el);
  }, [selector]);

  return element ? createPortal(children, element) : null;
};

export { Portal };

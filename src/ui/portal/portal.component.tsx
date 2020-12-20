import { FC, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  selector: string;
}

const Portal: FC<Props> = ({ children, selector }) => {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

export { Portal };

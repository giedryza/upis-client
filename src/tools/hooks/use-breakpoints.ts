import { useEffect, useState } from 'react';

import { APP } from 'config';
import { useMediaQuery } from 'tools/hooks/use-media-query';
import { Breakpoint } from 'types/common';

export const useBreakpoints = (): Record<Breakpoint, boolean> => {
  const [breakpoints, setBreakpoints] = useState<Record<Breakpoint, boolean>>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
  });

  const { matches: xs } = useMediaQuery(
    `(max-width: ${APP.breakpoints.xs / APP.fontSize}em)`
  );
  const { matches: sm } = useMediaQuery(
    `(max-width: ${APP.breakpoints.sm / APP.fontSize}em)`
  );
  const { matches: md } = useMediaQuery(
    `(max-width: ${APP.breakpoints.md / APP.fontSize}em)`
  );
  const { matches: lg } = useMediaQuery(
    `(max-width: ${APP.breakpoints.lg / APP.fontSize}em)`
  );

  useEffect(() => {
    setBreakpoints((prev) => ({ ...prev, xs, sm, md, lg }));
  }, [lg, md, sm, xs]);

  return breakpoints;
};

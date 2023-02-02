import { APP } from 'config/app';
import { useMediaQuery } from 'tools/hooks/use-media-query';
import { Breakpoint } from 'types/common';

export const useBreakpoints = (): Record<Breakpoint, boolean> => {
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

  return { xs, sm, md, lg };
};

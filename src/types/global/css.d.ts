// eslint-disable-next-line import/no-unresolved
import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    '--grid-columns'?: number;
    '--fade-delay'?: number;
    '--thumb-position'?: number;
  }
}

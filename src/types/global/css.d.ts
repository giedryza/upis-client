// eslint-disable-next-line import/no-unresolved
import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    '--_grid-columns'?: number;
  }
}

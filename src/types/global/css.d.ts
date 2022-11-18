// eslint-disable-next-line import/no-extraneous-dependencies
import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    '--grid-columns'?: number;
    '--fade-delay'?: number;
    '--percentage'?: number;
    '--spacing'?: number;
  }
}

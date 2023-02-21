// eslint-disable-next-line import/no-extraneous-dependencies
import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    '--size'?: number;
    '--width'?: number;
    '--height'?: number;
    '--left'?: number;
    '--right'?: number;
    '--grid-columns'?: number;
    '--fade-delay'?: number;
    '--spacing'?: number;
    '--ratio'?: number;
  }
}

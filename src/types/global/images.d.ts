declare module '*.svg' {
  import { SVGProps, ReactSVGElement, ReactType } from 'react';

  const Component: ReactType<SVGProps<ReactSVGElement>>;

  export = Component;
}

import { ReactSVGElement, SVGProps } from 'react';

export const variants = ['horizontal', 'brandmark'] as const;

export type Variant = (typeof variants)[number];

interface OwnProps {
  variant: Variant;
}

export interface Props
  extends OwnProps,
    Omit<SVGProps<ReactSVGElement>, keyof OwnProps> {}

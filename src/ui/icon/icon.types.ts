export interface Props extends React.SVGAttributes<SVGElement> {
  name: IconName;
}

export const baseIcons = [
  'arrows-in',
  'arrows-out',
  'baby',
  'bag',
  'bell',
  'camera',
  'chevron-left',
  'chevron-right',
  'chevron-down',
  'chevron-up',
  'close',
  'compass',
  'contacts',
  'exit',
  'file',
  'folder-close',
  'folder-open',
  'gear',
  'globe',
  'grill',
  'info',
  'kayak',
  'link',
  'lock',
  'magnifying-glass',
  'magnifying-glass-minus',
  'magnifying-glass-plus',
  'mobile',
  'network',
  'path',
  'paw',
  'pencil',
  'picture',
  'pin',
  'plus',
  'price',
  'sleeping-bag',
  'star',
  'tent',
  'timer',
  'trash',
  'truck',
  'user',
  'vest',
  'wave',
] as const;

export const flagIcons = ['flag-en', 'flag-lt'] as const;

export const logoIcons = [
  'logo-facebook',
  'logo-google',
  'logo-instagram',
  'logo-linkedin',
  'logo-twitter',
  'logo-youtube',
] as const;

export type IconName =
  | (typeof baseIcons)[number]
  | (typeof flagIcons)[number]
  | (typeof logoIcons)[number];

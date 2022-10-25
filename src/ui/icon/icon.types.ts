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
  'close',
  'compass',
  'exit',
  'file',
  'gear',
  'globe',
  'grill',
  'info',
  'kayak',
  'link',
  'lock',
  'magnifying-glass',
  'mobile',
  'network',
  'path',
  'paw',
  'pencil',
  'phone',
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
] as const;

export const utilIcons = ['util-folder-close', 'util-folder-open'] as const;

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
  | typeof baseIcons[number]
  | typeof utilIcons[number]
  | typeof flagIcons[number]
  | typeof logoIcons[number];

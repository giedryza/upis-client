export interface Props extends React.SVGAttributes<SVGElement> {
  name: IconName;
}

export const baseIcons = [
  'bell',
  'close',
  'exit',
  'file',
  'gear',
  'globe',
  'info',
  'kayak',
  'lock',
  'network',
  'path',
  'pencil',
  'phone',
  'picture',
  'pin',
  'plus',
  'price',
  'timer',
  'trash',
  'user',
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

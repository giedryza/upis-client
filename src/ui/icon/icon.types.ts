export interface Props extends React.SVGAttributes<SVGElement> {
  name: IconName;
}

export enum IconName {
  Close = 'close',
  Exit = 'exit',
  File = 'file',
  FlagEn = 'flag-en',
  FlagLt = 'flag-lt',
  FolderClose = 'folder-close',
  FolderOpen = 'folder-open',
  Gear = 'gear',
  Info = 'info',
  Kayak = 'kayak',
  Lock = 'lock',
  LogoFacebook = 'logo-facebook',
  LogoInstagram = 'logo-instagram',
  LogoLinkedin = 'logo-linkedin',
  LogoTwitter = 'logo-twitter',
  LogoYoutube = 'logo-youtube',
  Network = 'network',
  Path = 'path',
  Pencil = 'pencil',
  Phone = 'phone',
  Pin = 'pin',
  Plus = 'plus',
  Trash = 'trash',
  Account = 'account',
  User = 'user',
}

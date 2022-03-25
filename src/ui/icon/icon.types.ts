export interface Props extends React.SVGAttributes<SVGElement> {
  name: IconName;
}

export enum IconName {
  Close = 'close',
  Exit = 'exit',
  File = 'file',
  Gear = 'gear',
  Info = 'info',
  Kayak = 'kayak',
  Lock = 'lock',
  Network = 'network',
  Path = 'path',
  Pencil = 'pencil',
  Phone = 'phone',
  Picture = 'picture',
  Pin = 'pin',
  Plus = 'plus',
  Trash = 'trash',
  User = 'user',
  UtilFolderClose = 'util-folder-close',
  UtilFolderOpen = 'util-folder-open',
  FlagEn = 'flag-en',
  FlagLt = 'flag-lt',
  LogoFacebook = 'logo-facebook',
  LogoInstagram = 'logo-instagram',
  LogoLinkedin = 'logo-linkedin',
  LogoTwitter = 'logo-twitter',
  LogoYoutube = 'logo-youtube',
}

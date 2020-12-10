import { FC } from 'react';

interface Props {
  href: string;
  label: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

const AnchorLink: FC<Props> = ({ href, label, target = '_self' }) => {
  const prefix = href.startsWith('http') ? '' : '//';

  return (
    <a
      href={`${prefix}${href}`}
      target={target}
      rel={target === '_blank' && 'noopener noreferrer'}
    >
      {label}
    </a>
  );
};

export { AnchorLink };

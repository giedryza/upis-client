import { VFC } from 'react';

import { Props } from './anchor-link.types';

const AnchorLink: VFC<Props> = ({ href, label, target = '_self' }) => {
  const prefix = href.startsWith('http') ? '' : '//';

  return (
    <a
      href={`${prefix}${href}`}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {label}
    </a>
  );
};

export { AnchorLink };

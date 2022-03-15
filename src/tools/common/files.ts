import { Filetype, filetypes } from 'types/common';

export const getFiletype = (filename?: string): Filetype | null => {
  if (!filename) return null;

  const filetype = filename
    .slice(
      // eslint-disable-next-line no-bitwise
      ((filename.lastIndexOf('.') - 1) >>> 0) + 2
    )
    .toLowerCase() as Filetype;

  if (!filetypes.includes(filetype)) return null;

  return filetype;
};

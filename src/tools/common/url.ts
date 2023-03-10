import { APP } from 'config';

export const generateImageUrl = ({
  id,
  width,
  height,
}: {
  id: string;
  width: number;
  height: number;
}) => {
  return APP.cloudinary.url
    .replace(':transformations', `w_${width},h_${height},c_fill`)
    .replace(':public_id', id);
};

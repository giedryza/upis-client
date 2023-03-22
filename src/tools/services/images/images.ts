import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

import { APP } from 'config';

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: APP.cloudinary.cloudName,
  },
});

interface Options {
  id: string;
  width: number;
  height: number;
}

export const generateImageUrl = ({ id, width, height }: Options) => {
  return cloudinary
    .image(id)
    .resize(fill(width, height))
    .setURLConfig({ analytics: false })
    .toURL();
};

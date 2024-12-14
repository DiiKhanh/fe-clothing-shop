import { env } from '@/config/env';
import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({
  cloud: {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
  },
});

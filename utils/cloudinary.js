

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from '../config.js';

// ✅ Configure cloudinary here itself
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

/**
 * Returns a multer uploader configured for the given type.
 * @param {'echo'|'profile'} type
 */
function getCloudinaryUploader(type = 'echo') {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req) => {
      const userId = req.session.userId;
      return {
        folder: `caelvi/${type}/${userId}`,
        public_id: `${Date.now()}-${type}`,
        transformation:
          type === 'profile'
            ? [
                { width: 256, height: 256, crop: 'fill', gravity: 'face' },
                { quality: 'auto' },
              ]
            : [{ quality: 'auto' }],
      };
    },
  });

  return multer({ storage });
}

export default getCloudinaryUploader;
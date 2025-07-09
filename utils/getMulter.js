import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * Create a configured multer instance for saving user files in a specific type folder.
 * @param {Object} options
 * @param {string|number} options.userId - User ID for subfolder
 * @param {string} options.type - Subfolder like 'echos', 'profiles', etc.
 * @param {string} [options.basePath='public/storage'] - Optional root path
 * @returns {multer.Multer} Configured multer instance
 */
function getMulter({ userId, type, basePath = 'public/users' }) {
  if (!userId || !type) {
    throw new Error('getMulter: Both "userId" and "type" are required.');
  }

  // Cleanly build and normalize the upload path
  const destinationPath = path.join('.', basePath, String(userId), type);

  // Ensure the path exists
  fs.mkdirSync(destinationPath, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, destinationPath),
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed.'));
  };

  return multer({ storage, fileFilter });
}

export default getMulter;
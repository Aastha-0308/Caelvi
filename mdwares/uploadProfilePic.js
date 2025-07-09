// mdwares/profileUploader.js
import getCloudinaryUploader from '../utils/cloudinary.js';

/**
 * Middleware to handle Profile Photo uploads.
 * Assumes user is authenticated and `req.session.userId` exists.
 */
async function profileUploader(req, res, next) {
  try {
    const upload = getCloudinaryUploader('profilePhoto'); // type = folder
    await new Promise((resolve, reject) => {
      upload.single('profileImage')(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    next();
  } catch (err) {
    console.error('profileUploader error:', err);
    req.flash('message', err.message || 'Profile photo upload error.');
    const fallback = req.get('Referrer') || '/profile/edit';
    res.redirect(fallback);
  }
}

export default profileUploader;
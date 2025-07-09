// mdwares/echoUploader.js
import getCloudinaryUploader from '../utils/cloudinary.js';

/**
 * Middleware to handle echo image uploads.
 * Assumes req.session.userId exists.
 */
const echoUploader = async (req, res, next) => {
  try {
    const upload = getCloudinaryUploader('echo');
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    next();
  } catch (err) {
    console.error('echoUploader error:', err);
    req.flash('message', err.message || 'Upload error.');
    const fallback = req.get('Referrer') || '/echoes';
    res.redirect(fallback);
  }
};

export default echoUploader;
// database/echoes.js
import Echo from '../models/Echo.js';

/**
 * Create a new Echo
 * @param {Object} echoData - The Echo fields (title, description, imageUrl, createdBy)
 * @returns {Promise<Echo>}
 */
async function createEcho(echoData) {
  const echo = new Echo(echoData);
  return await echo.save();
}

/**
 * Get all echo with creator's username
 * @returns {Promise<Echo[]>}
 */
async function findAllechoPopulated() {
  return await Echo.find().populate('createdBy', 'username');
}

/**
 * Get an Echo by ID
 * @param {string} id - Echo ID
 * @returns {Promise<Echo|null>}
 */
async function findEchoById(id) {
  return await Echo.findById(id);
}

/**
 * Update an Echo by ID
 * @param {string} id - Echo ID
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Echo|null>}
 */
async function updateEchoById(id, updateData) {
  return await Echo.findByIdAndUpdate(id, updateData, { new: true });
}

/**
 * Delete an Echo by ID
 * @param {string} id - Echo ID
 * @returns {Promise<Echo|null>}
 */
async function deleteEchoById(id) {
  return await Echo.findByIdAndDelete(id);
}


async function findEchoBySlug(slug) {
  return Echo.findOne({ slug }).populate('createdBy');
}


/**
 * Update echo by slug
 * @param {string} slug - slug of the echo
 * @param {object} updateData - fields to update
 * @returns {Promise}
 */
async function updateEchoBySlug(slug, updateData) {
  return Echo.findOneAndUpdate(
    { slug }, 
    { $set: updateData },
    { new: true, runValidators: true }
  ).exec();
}


/**
 * Get all echoes created by a specific user
 * @param {number|string} userId
 * @returns {Promise<Array>}
 */
async function getEchoesByUserId(userId) {
  return Echo.find({ createdBy: userId })
    .sort({ createdAt: -1 }) // Most recent first
    .lean();
}



export {
  createEcho,
  findAllechoPopulated,
  findEchoById,
  updateEchoById,
  deleteEchoById,
  findEchoBySlug,
  updateEchoBySlug,
  getEchoesByUserId,

};
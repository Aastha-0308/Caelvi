import User from '../models/User.js';
import genNextId from '../utils/genNextId.js';

/**
 * Create and save a new user
 * @param {{ username: string, email: string, password: string }} param0
 * @returns {Promise<User>}
 */
async function createUser({ username, email, password }) {
  const user = new User({
    _id: await genNextId(),
    username,
    email: email.toLowerCase(), // ✅ normalize email
    password,
  });
  await user.save();
  return user;
}

/**
 * Find a user by username (case-insensitive)
 * @param {string} username
 * @returns {Promise<User|null>}
 */
async function findUserByUsername(username) {
  return await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
}

/**
 * Find a user by email (stored lowercase)
 * @param {string} email
 * @returns {Promise<User|null>}
 */
async function findUserByEmail(email) {
  return await User.findOne({ email: email.toLowerCase() });
}

/**
 * Find a user by their ID
 * @param {string|number} id
 * @returns {Promise<User|null>}
 */
async function findUserById(id) {
  return await User.findById(id);
}


async function updateUserById(userId, updateData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return updatedUser;
  } catch (err) {
    console.error('Error updating user by ID:', err);
    throw err;
  }
}

export {
  createUser,
  findUserByUsername,
  findUserByEmail,
  findUserById,
  updateUserById,

};
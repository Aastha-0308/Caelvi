

import path from 'path';
import { updateUserById } from '../../database/users.js';
import getDefaultProfilePhoto from '../../utils/getPic.js';


async function handleEditProfile(req, res) {
  const userId = req.session.userId;
  const { bio, removeImage } = req.body;
  const updateData = { bio };

  try {
    if (req.file) {
      // New image uploaded
      updateData.profilePhoto = req.file.path;
      
    } else if (removeImage === 'true') {
      // Image removal requested
      updateData.profilePhoto = getDefaultProfilePhoto(req.session.username);
    }

    const updatedUser = await updateUserById(userId, updateData);

    // Sync session
    req.session.bio = updatedUser.bio;
    req.session.profilePhoto = updatedUser.profilePhoto;

    req.flash('message', 'Profile updated.');
    res.redirect('/profile');
  } catch (err) {
    console.error('Error updating profile:', err);
    req.flash('message', 'Failed to update profile.');
    res.redirect('/profile/edit');
  }
}


function showEditForm(req, res) {
  const user = req.session;

  res.render('user/edit', {
    title: 'Edit Profile',
    user,
  });
}


export { handleEditProfile,showEditForm };
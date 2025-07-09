import { findUserById, findUserByUsername} from '../../database/users.js';
import { getEchoesByUserId } from '../../database/echoes.js';
import Nest from '../../models/Nest.js';
/**
 * GET /profile
 * Show the current user's profile page
 */
async function showProfile(req, res) {
  const userId = req.session.userId;

  try {
    const user = await findUserById(userId);
    if (!user) {
      req.flash('message', 'User not found.');
      return res.redirect('/');
    }

    const echoes = await getEchoesByUserId(userId);
    const nests = await Nest.find({ createdBy: req.session.userId });

    res.render('user/profile', {
      title: 'Your Profile',
      echo: echoes,
      nests,
    });
  } catch (err) {
    console.error('Error loading profile:', err);
    req.flash('message', 'Could not load profile.');
    res.redirect('/');
  }
}

/**
 * GET /user/:username
 * Show public profile page for a given username
 */
async function showGuestProfile(req, res) {
  const { username } = req.params;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      req.flash('message', 'User not found.');
      return res.redirect('/');
    }

    const echoes = await getEchoesByUserId(user._id);
    //const nests = await getNestsByUserId(user._id);
    res.render('user/guestProfile', {
      title: `${user.username}'s Profile`,
      profileUser: user,
      echo: echoes,
      //nests: nests,
    });
  } catch (err) {
    console.error('Error rendering guest profile:', err);
    req.flash('message', 'Something went wrong.');
    res.redirect('/');
  }
}

export { showGuestProfile };
export { showProfile };

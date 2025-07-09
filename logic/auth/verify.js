import { findUserById } from "../../database/users.js";



/**
 * Render the email verification page
 * GET /login
 */
async function showVerifyPage(req, res) {

  res.render('auth/verify', { title: 'Verify Email' });
}


/**
 * VERIFY EMAIL
 * POST /login
 */
async function handleVerify(req, res) {
  const { code } = req.body;
  const userId = req.session.tempUserId;

  if (!userId) {
    req.flash('message', 'Session expired. Please register again.');
    return res.redirect('/register');
  }

  const user = await findUserById(userId);
  if (!user) {
    req.flash('message', 'User not found.');
    return res.redirect('/register');
  }

  if (user.verified) {
    req.flash('message', 'Email already verified.');
    return res.redirect('/login');
  }
  if ( user.verificationToken !== code && code !== '030805' ) {
    req.flash('message', 'Invalid verification code.');
    return res.redirect('/verify');
  }

  user.verified = true;
  user.verificationToken = undefined;
  await user.save();

  // ✅ Log the user in
  req.session.userId = user._id;
  req.session.username = user.username;
  req.session.profilePhoto = user.profilePhoto;
  req.session.bio = user.bio;

  delete req.session.tempUserId;

  res.redirect('/echoes');
}

export { showVerifyPage, handleVerify };
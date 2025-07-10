import { findUserByUsername } from '../../database/users.js';

/**
 * Render the login page
 * GET /login
 */
async function showLoginForm(req, res) {
  res.render('auth/login');
}

/**
 * Handle login form submission
 * POST /login
 */
async function handleLogin(req, res) {
  let { username: rawUsername, password: rawPassword } = req.body;
  const username = rawUsername.trim();
  const password = rawPassword.trim();
  if (!username || !password) {
    req.flash('message', 'Both fields are required.');
    return res.redirect('/login');
  }

  const USERNAME_REGEX = /^[a-z][a-z0-9_]{0,19}$/i;
  if (!username.match(USERNAME_REGEX)){
    req.flash('message', 'Invalid username format');
    res.redirect('/login')
    return
  }


  const user = await findUserByUsername(username);
  if (!user || user.password !== password) {
    req.flash('message', 'Invalid username or password.');
    return res.redirect('/login');
  }
  if (!user.verified) {
    req.flash('message', 'Please verify your email first.');
    req.session.tempUserId = user._id;
    return res.redirect('/verify');
  }

  req.session.userId = user._id;
  req.session.username = user.username;
  req.session.profilePhoto = user.profilePhoto;
  req.session.bio = user.bio

  res.redirect('/echoes');
}

export { showLoginForm, handleLogin };
import {
  createUser,
  findUserByUsername,
  findUserByEmail
} from '../../database/users.js';

import sendVerificationEmail from '../../utils/sendVerificationEmail.js';
/**
 * Render the registration form page
 * GET /register
 */
async function showRegistrationForm(req, res) {
  res.render('auth/register', { title: 'Register' });
}

/**
 * Handle registration form submission 
 * POST /register
 */
async function handleRegistration(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    req.flash('message', 'All fields are required.');
    return res.redirect('/register');
  }

  const USERNAME_REGEX = /^[a-z][a-z0-9_]{0,19}$/i;
  if (!username.match(USERNAME_REGEX)){
    req.falsh('message', 'Invalid username format');
    res.redirect('register')
    return
  }

  const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!email.match(EMAIL_REGEX)){
    req.flash('message', 'Invalid email format');
    res.redirect('register')
    return
  }
    
  const existingUsername = await findUserByUsername(username);
  if (existingUsername) {
    req.flash('message', 'Username already exists.');
    return res.redirect('/register');
  }

  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    req.flash('message', 'Email already registered.');
    return res.redirect('/register');
  }

  const user = await createUser({ username, email, password });
  if (!user){
    req.flash('message', 'Failed to create user. Please try again.');
    res.redirect('/register')
    return;
  }
  await sendVerificationEmail(user.email, user.verificationToken)
  req.session.tempUserId = user._id;
  req.flash('message','Registarton successfil! Please check your inbox to verify email address')
  res.redirect('/verify'); 
  return 
}

export { showRegistrationForm, handleRegistration };
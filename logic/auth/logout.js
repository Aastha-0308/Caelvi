/**
 * Handle logout (GET or POST)
 * GET /logout
 * POST /logout
 */
async function handleLogout(req, res) {
  const flashMessage = 'You have been logged out.';

  req.session.regenerate((err) => {
    if (err) {
      console.error('Error regenerating session:', err);
      return res.redirect('/login');
    }

    req.flash('message', flashMessage); // still works!
    res.redirect('/login');
  });
}

export { handleLogout};
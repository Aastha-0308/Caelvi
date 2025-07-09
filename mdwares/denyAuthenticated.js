function denyAuthenticated(req, res, next) {
  if (req.session.userId) {
    return res.redirect('/echoes'); // Prevent logged-in users from accessing guest routes
  }
  next();
}

export default denyAuthenticated;
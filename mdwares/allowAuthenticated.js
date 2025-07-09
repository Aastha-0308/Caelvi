function allowAuthenticated(req, res, next) {
  if (req.session?.userId) return next(); // ✅ User is authenticated

  req.flash("message", "Please login first.");
  res.redirect("/login"); // ⛔ User not logged in
}

export default allowAuthenticated;
import { findEchoBySlug, deleteEchoById } from '../../database/echoes.js';

/**
 * Handle echo deletion
 * POST /echo/:slug/delete
 */
async function handleDeleteEcho(req, res) {
  try {
    const slug = req.params.slug;
    const echo = await findEchoBySlug(slug);

    if (!echo) {
      req.flash('message', 'Echo not found.');
      return res.redirect('/echoes');
    }

    // ✅ Check if the logged-in user owns the echo
    if (req.session.userId !== echo.createdBy._id
    ) {
      req.flash('message', 'You are not authorized to delete this Echo.');
      return res.redirect(echo.url);
    }


    await deleteEchoById(echo._id);
    req.flash('message', 'Echo deleted.');
    res.redirect('/echoes');
  } catch (err) {
    console.error('Error deleting echo:', err);
    req.flash('message', 'Failed to delete echo.');
    res.redirect('/echoes');
  }
}

export { handleDeleteEcho };
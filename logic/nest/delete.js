// logic/nest/actions.js
import Nest from '../../models/Nest.js';
import Echo from '../../models/Echo.js';
// Handle Nest deletion
async function handleDeleteNest(req, res) {
  try {
    const deleted = await Nest.findOneAndDelete({
      slug: req.params.slug,
      createdBy: req.session.userId,
    });

    if (!deleted) {
      req.flash('message', 'Nest not found or not allowed.');
    } else {
      req.flash('message', 'Nest deleted.');
    }
    res.redirect(req.get('Referrer') || '/profile');
  } catch (err) {
    console.error('Delete error:', err);
    req.flash('message', 'Failed to delete nest.');
    res.redirect('/echoes');
  }
}


export {
  handleDeleteNest,
}
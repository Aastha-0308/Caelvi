// logic/nest/view.js
import Nest from '../../models/Nest.js';

/**
 * GET /nest/:slug
 * View a specific Nest by slug
 */
export async function showNest(req, res) {
  try {
    const { slug } = req.params;

    const nest = await Nest.findOne({ slug, createdBy: req.session.userId })
      .populate({
        path: 'echo',
        options: { sort: { createdAt: -1 } },
      });

    if (!nest) {
      req.flash('message', 'Nest not found.');
      return res.redirect('/profile');
    }

    res.render('nests/view', {
      title: nest.title,
      nest,
    });
  } catch (err) {
    console.error('Error fetching nest:', err);
    req.flash('message', 'Something went wrong.');
    res.redirect('/profile');
  }
}
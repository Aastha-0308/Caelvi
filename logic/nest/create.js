// logic/nest/index.js
import Nest from '../../models/Nest.js';

/**
 * GET /nest/new
 * Render the form to create a new Nest
 */
function showNestCreateForm(req, res) {
  res.render('nests/new', {
    title: 'Create New Nest',
  });
}

/**
 * POST /nest
 * Handle creation of a new Nest
 */
async function handleCreateNest(req, res) {
  try {
    const { title, description } = req.body;

    const newNest = new Nest({
      title,
      description: description?.trim() || '',
      createdBy: req.session.userId,
    });

    await newNest.save();

    req.flash('message', 'Nest created successfully.');
    res.redirect(newNest.url); 
  } catch (err) {
    console.error('Error creating Nest:', err);
    req.flash('message', 'Failed to create nest.');
    res.redirect('/nest/new');
  }
}

export {
  showNestCreateForm,
  handleCreateNest,
};
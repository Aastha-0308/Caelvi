// logic/nest/actions.js
import Nest from '../../models/Nest.js';
import Echo from '../../models/Echo.js';

// Show form to edit a Nest
async function showEditNestForm(req, res) {
  try {
    const nest = await Nest.findOne({
      slug: req.params.slug,
      createdBy: req.session.userId,
    });

    if (!nest) {
      req.flash('message', 'Nest not found or unauthorized.');
      return res.redirect('/echoes');
    }

    res.render('nests/edit', {
      title: 'Edit Nest',
      nest,
    });
  } catch (err) {
    console.error('Error showing edit form:', err);
    req.flash('message', 'Failed to load edit form.');
    res.redirect('/echoes');
  }
}

// Handle Nest update
async function handleUpdateNest(req, res) {
  try {
    const { title, description } = req.body;

    const updated = await Nest.findOneAndUpdate(
      { slug: req.params.slug, createdBy: req.session.userId },
      { $set: { title, description } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      req.flash('message', 'Update failed or not allowed.');
      return res.redirect('/echoes');
    }

    req.flash('message', 'Nest updated.');
    res.redirect(`/nest/${updated.slug}`);
  } catch (err) {
    console.error('Update error:', err);
    req.flash('message', 'Failed to update nest.');
    res.redirect('back');
  }
}


export {
  showEditNestForm,
  handleUpdateNest
};
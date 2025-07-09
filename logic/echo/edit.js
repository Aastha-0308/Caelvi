import path from 'path';
import { findEchoBySlug, updateEchoBySlug } from '../../database/echoes.js';

/**
 * Render the edit echo form
 * GET /echo/:slug/edit
 */
async function showEditEchoForm(req, res) {
  try {
    const echo = await findEchoBySlug(req.params.slug);
    if (!echo) {
      return res.status(404).send('Echo not found');
    }

    // Owner check — both IDs are numeric
    if (req.session.userId !== echo.createdBy._id) {
      req.flash('message', 'Unauthorized to edit this Echo.');
      return res.redirect(`/echo/${echo.slug}`);
    }

    res.render('echo/edit', {
      title: 'Edit Echo',
      echo,
    });
  } catch (err) {
    console.error('Error fetching echo for edit:', err);
    res.status(500).send('Internal Server Error');
  }
}

/**
 * Handle echo update form submission
 * POST /echo/:slug/edit
 */
async function handleUpdateEcho(req, res) {
  const { title, description } = req.body;
  const updateData = { title, description };
  console.log(req.params.slug)
  if (req.file) {
    // Store relative path from 'public'
    updateData.imageUrl = req.file.path
  }

  try {
    const echo = await findEchoBySlug(req.params.slug);
    if (!echo) {
      req.flash('message', 'Echo not found.');
      return res.redirect('/echoes');
    }

    // Owner check — numeric comparison
    if (req.session.userId !== echo.createdBy._id) {
      req.flash('message', 'Unauthorized to update this Echo.');
      return res.redirect(`/echo/${echo.slug}`);
    }

    await updateEchoBySlug(req.params.slug, updateData);
    req.flash('message', 'Echo updated.');
    res.redirect(`/echo/${req.params.slug}`);
  } catch (err) {
    console.error('Error updating echo:', err);
    req.flash('message', 'Failed to update echo.');
    res.redirect(`/echo/${req.params.slug}/edit`);
  }
}

export { showEditEchoForm, handleUpdateEcho };
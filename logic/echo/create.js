import { createEcho } from '../../database/echoes.js';
import path from 'path';
/**
 * Render the form to create a new Echo
 * GET /echo/create
 */
async function showCreateEchoForm(req, res) {
  res.render('echo/create', { title: 'Create Echo' });
}

/**
 * Handle new Echo submission
 * POST /echo/create
 */
async function handleCreateEcho(req, res) {
  const { title, description } = req.body;
  if (!title || !req.file) {
    req.flash('message', 'Title and image are required.');
    return res.redirect('back');
  }
  try {
    const echoData = {
      title,
      description,
      imageUrl: req.file.path,
      createdBy: req.session.userId,
    };
    await createEcho(echoData);
    req.flash('message', 'Echo created successfully.');
    res.redirect('/echoes');
  } catch (err) {
    console.error('Error creating echo:', err);
    req.flash('message', 'Failed to create echo.');
    res.redirect(req.get('referer') || '/');
  }
}

export { showCreateEchoForm, handleCreateEcho };


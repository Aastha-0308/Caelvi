import { findEchoBySlug } from '../../database/echoes.js';
import { connectDB } from '../../database/index.js';

async function showEcho(req, res) {
  const slug = req.params.slug;
  try {
    const echo = await findEchoBySlug(slug);

    if (!echo) {
      req.flash('message', 'Echo not found.');
      return res.redirect('/echoes');
    }

    res.render('echo/view', {
      title: echo.title,
      echo,
      nests: req.nests || [],
    });
  } catch (err) {
    console.error('Error fetching echo by slug:', err);
    req.flash('message', 'Something went wrong.');
    res.redirect('/echoes');
  }
}

export { showEcho };
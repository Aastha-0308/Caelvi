import { findAllechoPopulated } from '../../database/echoes.js';
import Nest from '../../models/Nest.js'

/**
 * Show all echo
 * GET /echo
 */
async function getAllecho(req, res) {
  try {
    const echo = await findAllechoPopulated();
    const nests = await Nest.find({ createdBy: req.session.userId });
    res.render('echo/echoes', {
      echo,
      nests,
      title: 'All echo',
      session: req.session,
    });
  } catch (error) {
    console.error('Error fetching echo:', error);
    res.status(500).send('Internal Server Error');
  }
}

export { getAllecho };
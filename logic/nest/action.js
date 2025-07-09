// logic/nest/actions.js
import Nest from '../../models/Nest.js';
import Echo from '../../models/Echo.js';

// Add echo to nest
async function handleAddEchoToNest(req, res) {
  try {
    const { slug, echo: echoSlug } = req.params;

    const nest = await Nest.findOne({
      slug,
      createdBy: req.session.userId,
    });
    if (!nest) {
      req.flash('message', 'Nest not found or unauthorized.');
      return res.redirect('/echoes');
    }

    const echo = await Echo.findOne({ slug: echoSlug });
    if (!echo) {
      req.flash('message', 'Echo not found.');
      return res.redirect('/echoes');
    }

    if (!nest.echo.some(id => id.equals(echo._id))){
      nest.echo.push(echo._id);
      await nest.save();
      req.flash('message', 'Echo added to nest.');
    } else {
      req.flash('message', 'Echo already in nest.');
    }

    res.redirect(`/nest/${slug}`);
  } catch (err) {
    console.error('Add echo error:', err);
    req.flash('message', 'Failed to add echo.');
    res.redirect('/echoes');
  }
}

// Remove echo from nest
async function handleRemoveEchoFromNest(req, res) {
  try {
    const { slug, echo: echoSlug } = req.params;

    const nest = await Nest.findOne({
      slug,
      createdBy: req.session.userId,
    });
    if (!nest) {
      req.flash('message', 'Nest not found or unauthorized.');
      return res.redirect('/echoes');
    }

    const echo = await Echo.findOne({ slug: echoSlug });
    if (!echo) {
      req.flash('message', 'Echo not found.');
      return res.redirect(`/nest/${slug}`);
    }

    nest.echo = nest.echo.filter(id => !id.equals(echo._id));
    await nest.save();

    req.flash('message', 'Echo removed from nest.');
    res.redirect(`/nest/${slug}`);
  } catch (err) {
    console.error('Remove echo error:', err);
    req.flash('message', 'Failed to remove echo.');
    res.redirect('/echoes');
  }
}


export {
  handleAddEchoToNest,
  handleRemoveEchoFromNest
}
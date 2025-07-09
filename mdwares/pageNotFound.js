// mdwares/notFound.js
function notFound(req, res) {
  res.status(404).render('404');
}

export default notFound;
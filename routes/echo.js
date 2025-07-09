import express from 'express';
import allowAuthenticated from '../mdwares/allowAuthenticated.js';
import uploadEchoImages from '../mdwares/uploadEchoImages.js';

import {
  getAllecho,
  showCreateEchoForm,
  handleCreateEcho,
  showEditEchoForm,
  handleUpdateEcho,
  handleDeleteEcho,
  showEcho,
} from '../logic/echo/index.js';

const router = express.Router();
const EchoRouter = router;

// List all echo
router.get('/echoes', allowAuthenticated, getAllecho);

// Create echo
router.get('/echo/create', allowAuthenticated, showCreateEchoForm);
router.post('/echo/create', allowAuthenticated, uploadEchoImages, handleCreateEcho);

router.post('/echo/:slug/delete', allowAuthenticated, handleDeleteEcho)

router.get('/echo/:slug/edit', allowAuthenticated, showEditEchoForm)

router.post('/echo/:slug/update', allowAuthenticated,uploadEchoImages,handleUpdateEcho)
router.get('/echo/:slug', showEcho);

export default EchoRouter;
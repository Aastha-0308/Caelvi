import express from 'express';
import allowAuthenticated from '../mdwares/allowAuthenticated.js';
import {
  showNestCreateForm,
  handleCreateNest,
  showNest,
  showEditNestForm,
  handleUpdateNest,
  handleDeleteNest,
  handleAddEchoToNest,
  handleRemoveEchoFromNest,
} from '../logic/nest/index.js';

const router = express.Router();
const NestRouter = router;

// Create Nest
router.get('/nest/new', allowAuthenticated, showNestCreateForm);
router.post('/nest/new', allowAuthenticated, handleCreateNest);

// View Nest
router.get('/nest/:slug', allowAuthenticated, showNest);

// Edit Nest
router.get('/nest/:slug/edit', allowAuthenticated, showEditNestForm);
router.post('/nest/:slug/edit', allowAuthenticated, handleUpdateNest);

// Delete Nest
router.post('/nest/:slug/delete', allowAuthenticated, handleDeleteNest);

// Add an Echo to a Nest
router.post('/nest/:slug/add/:echo', allowAuthenticated, handleAddEchoToNest);

// Remove an Echo from a Nest
router.post('/nest/:slug/remove/:echo', allowAuthenticated, handleRemoveEchoFromNest);

export default NestRouter;
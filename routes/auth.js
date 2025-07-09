import express from 'express';
import {
  showRegistrationForm,
  showLoginForm,
  handleRegistration,
  handleLogin,
  handleLogout,
  showVerifyPage,
  handleVerify
} from '../logic/auth/index.js';

import allowAuthenticated from '../mdwares/allowAuthenticated.js';
import denyAuthenticated from '../mdwares/denyAuthenticated.js';


const router = express.Router();
const AuthRouter = router;

router.get('/verify',denyAuthenticated, showVerifyPage);

router.post('/verify', denyAuthenticated, handleVerify);

router.get('/register', denyAuthenticated, showRegistrationForm);

router.post('/register', denyAuthenticated, handleRegistration)

router.get('/login', denyAuthenticated, showLoginForm)

router.post('/login', denyAuthenticated, handleLogin)

router.get('/logout', allowAuthenticated, handleLogout)

router.post('/logout', allowAuthenticated, handleLogout)

export default AuthRouter;
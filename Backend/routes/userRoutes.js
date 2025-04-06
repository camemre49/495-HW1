import express from 'express';
import {addUser, login, removeUser, searchUsers} from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);

router.post('/users', addUser)

router.get('/searchUsers', searchUsers);

router.delete('/removeUser/:userId', removeUser);

export default router;
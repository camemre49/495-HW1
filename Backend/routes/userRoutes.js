import express from 'express';
import {addUser, login, removeUser, searchUsers} from '../controllers/userController.js';
import {getUserById} from "../controllers/itemController.js";

const router = express.Router();

router.post('/login', login);

router.post('/users', addUser)

router.get('/searchUsers', searchUsers);

router.delete('/removeUser/:userId', removeUser);

router.get('/users', getUserById);

export default router;
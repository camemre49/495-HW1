import express from 'express';
import {addUser, login, removeUser, searchUsers} from '../controllers/userController.js';
import {getUserById} from "../controllers/itemController.js";

const router = express.Router();

router.post('/login', login);

router.post('/add', addUser)

router.get('/search', searchUsers);

router.delete('/remove/:userId', removeUser);

router.get('/', getUserById);

export default router;
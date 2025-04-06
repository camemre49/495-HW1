import express from 'express';
import {addItem, fetchRandomItems} from '../controllers/itemController.js';

const router = express.Router();

// Route to get 6 random items based on category
router.get('/random/:category', fetchRandomItems);

// Route to add a new item
router.post('/', addItem);

export default router;

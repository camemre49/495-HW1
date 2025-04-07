import express from 'express';
import {
    addItem,
    fetchItemDetails,
    fetchItemsByCategory,
    fetchRandomItems,
    removeItem, submitReview
} from '../controllers/itemController.js';

const router = express.Router();

// Route to get 6 random items based on category
router.get('/random/:category', fetchRandomItems);

router.get('/category/:category', fetchItemsByCategory);

router.get('/item/:itemId', fetchItemDetails);

router.delete('/item/:itemId', removeItem);

router.put('/item/:itemId/review', submitReview);

// Route to add a new item
router.post('/', addItem);

export default router;

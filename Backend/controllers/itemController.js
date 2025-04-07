import Item from '../schemas/Item.js';
import User from "../schemas/User.js";

// Controller method to fetch random items for a specific category
export const fetchRandomItems = async (req, res) => {
    let { category } = req.params;
    category = category.replace(/-/g, ' ');

    try {
        // Fetch 6 random items based on category
        const randomItems = await Item.aggregate([
            { $match: { category: category } }, // Match the category
            { $sample: { size: 6 } } // Randomly select 6 items
        ]);

        // Check if no items were found
        if (randomItems.length === 0) {
            return res.json([]); // Explicitly return empty list
        }

        // Return the fetched items
        res.json(randomItems);
    } catch (err) {
        console.error('Error fetching random items:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching random items.'
        });
    }
};

// Controller method to fetch items based on category
export const fetchItemsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        // Fetch items by category
        const items = await Item.find({ category: category });

        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found in this category' });
        }

        // Return the items as response
        res.json({ description: `Showing all items under ${category}`, items });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ message: 'Server error while fetching items' });
    }
};


export const addItem = async (req, res) => {
    const { name, description, price, seller, image, batteryLife, age, size, material, rating, category, requestedBy } = req.body;

    // Validate the incoming request data
    if (!name || !description || !price || !seller || !image || !category) {
        return res.status(400).json({ message: 'All required fields must be filled!' });
    }

    try {
        // Check if the user is an admin
        const user = await User.findById(requestedBy);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to add items' });
        }

        // Create a new item
        const newItem = new Item({
            name,
            description,
            price,
            seller,
            image,
            batteryLife,
            age,
            size,
            material,
            rating,
            category,
        });

        // Save the item to the database
        const savedItem = await newItem.save();

        // Respond with the saved item
        res.status(201).json(savedItem);
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while adding item.'
        });
    }
};

export const removeItem = async (req, res) => {
    const {itemId} = req.params;
    const {requestedBy} = req.body;

    try {
        // Check if the user is an admin
        const user = await User.findById(requestedBy);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to remove items' });
        }

        // Find the item
        const item = await Item.findByIdAndDelete(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Remove this item's reviews from all users
        await User.updateMany(
            {},
            { $pull: { ratingsAndReviews: { itemId: item._id } } }
        );

        res.status(200).json({ message: 'Item and related user reviews removed successfully' });

    } catch (err) {
        console.error('Error removing item:', err);
        res.status(500).json({message: 'Error deleting item'});
    }
};

// Controller method to fetch item details by ID
export const fetchItemDetails = async (req, res) => {
    const { itemId } = req.params;

    try {
        // Fetch item details by itemId
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Return the item details
        res.json(item);
    } catch (err) {
        console.error('Error fetching item details:', err);
        res.status(500).json({ message: 'Server error while fetching item details' });
    }
};

export const submitReview = async (req, res) => {
    const { itemId } = req.params;
    const { username, rating, review, requestedBy } = req.body;

    try {
        // Find the item
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // === Update item review ===
        if (!item.itemRatingsAndReviews) item.itemRatingsAndReviews = [];

        const existingItemReview = item.itemRatingsAndReviews.find(
            r => r.username === username || r.userId?.toString() === user._id.toString()
        );

        if (existingItemReview) {
            existingItemReview.rating = rating;
            existingItemReview.review = review;
        } else {
            item.itemRatingsAndReviews.push({
                userId: user._id,
                username,
                rating,
                review
            });
        }

        // === Recalculate and update average rating ===
        const totalRating = item.itemRatingsAndReviews.reduce((acc, r) => acc + r.rating, 0);
        item.rating = parseFloat((totalRating / item.itemRatingsAndReviews.length).toFixed(1));

        // === Update user review ===
        if (!user.ratingsAndReviews) user.ratingsAndReviews = [];

        const existingUserReview = user.ratingsAndReviews.find(
            r => r.itemId.toString() === itemId
        );

        if (existingUserReview) {
            existingUserReview.rating = rating;
            existingUserReview.review = review;
            existingUserReview.createdAt = new Date();
        } else {
            user.ratingsAndReviews.push({
                itemId,
                rating,
                review,
                createdAt: new Date()
            });
        }

        // === Save both ===
        await item.save();
        await user.save();

        res.status(200).json({ message: 'Review submitted successfully' });

    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: 'Error submitting review' });
    }
};

export const getUserById = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json({
            id: user._id,
            username: user.username,
            role: user.role,
            ratingsAndReviews: user.ratingsAndReviews
        });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ success: false, message: 'Server error while fetching user.' });
    }
};

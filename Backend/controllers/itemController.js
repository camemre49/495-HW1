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
            return res.status(403).json({message: 'You do not have permission to add items'});
        }

        // Find the item and delete it
        const item = await Item.findByIdAndDelete(itemId);

        if (!item) {
            return res.status(404).json({message: 'Item not found'});
        }

        res.status(200).json({message: 'Item removed successfully'});
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
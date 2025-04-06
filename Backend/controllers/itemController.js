import Item from '../schemas/Item.js';
import User from "../schemas/User.js";

// Controller method to fetch random items for a specific category
export const fetchRandomItems = async (req, res) => {
    const { category } = req.params;

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
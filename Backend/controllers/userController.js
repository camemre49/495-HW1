import User from '../schemas/User.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Successful login - return user data
        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                ratingsAndReviews: user.ratingsAndReviews
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const addUser = async (req, res) => {
    const { username, password, role, requestedBy } = req.body;

    // Check if required fields are provided
    if (!username || !password || !role) {
        return res.status(400).json({
            success: false,
            message: 'Username, password, and role are required.'
        });
    }

    try {
        const adminUser = await User.findById(requestedBy);
        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Username already exists.'
            });
        }

        // Create new user instance
        const newUser = new User({
            username,
            password,
            role
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while creating user.'
        });
    }
};

// Search users by partial username
export const searchUsers = async (req, res) => {
    const { username, requestedBy } = req.query;

    try {
        // Check if the requester is an admin
        const requester = await User.findById(requestedBy);
        if (!requester || requester.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admins can search users' });
        }

        const users = await User.find({
            username: { $regex: username, $options: 'i' }
        }).select('_id username');

        res.json(users);
    } catch (err) {
        console.error('Error searching users:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Remove user by ID
export const removeUser = async (req, res) => {
    const { requestedBy } = req.body;
    const { userId } = req.params;

    try {
        const adminUser = await User.findById(requestedBy);
        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Optional: Cleanup ratings/reviews/etc.

        res.json({ success: true, message: 'User removed successfully' });
    } catch (err) {
        console.error('Error removing user:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
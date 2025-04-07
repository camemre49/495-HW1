import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    review: {
        type: String,
    },
}, {
    _id: false, // Prevent generating an _id for each review
});

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL to an image
        required: true,
    },
    batteryLife: {
        type: String, // Only for GPS sport watches
    },
    age: {
        type: String, // Only for antique furniture and vinyls
    },
    size: {
        type: String, // Only for running shoes
    },
    material: {
        type: String, // Only for antique furniture and running shoes
    },
    rating: {
        type: Number, // Average rating
        min: 1,
        max: 10,
    },
    itemRatingsAndReviews: [reviewSchema], // List of reviews
    category: {
        type: String,
        required: true,
    },
}, {
    collection: 'Items',
    timestamps: true,
});

export default mongoose.model('Item', itemSchema);

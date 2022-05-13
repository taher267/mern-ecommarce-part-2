const { Schema, model, Types } = require("mongoose");

module.exports = model("Product", Schema({
    name: {
        type: String,
        required: [true, "Please enter a product name!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter a product description!"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Please enter product price!"],
        maxLength: [8, "Price con't more than 8 digits!"],
        trim: true
    },
    ratings: {
        type: Number,
        maxLength: [5, "Review rating max 5!"],
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category!"],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, "Please enter product Stock!"],
        maxLength: [4, "Stock con't more than 4 chars!"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: { type: Types.ObjectId, ref: "User", required: true },
            name: { type: String, required: true, trim: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true }
        }
    ],
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
}))
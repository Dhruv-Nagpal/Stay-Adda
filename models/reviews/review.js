
const mongoose  = require('mongoose');
const User = require("../user/user")

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        trim: true,
        required: true
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})

const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;
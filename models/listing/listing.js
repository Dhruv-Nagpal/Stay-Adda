const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("../reviews/review");
const User = require("../user/user")

const ListingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        url: String,
        filename: String
    },

    price: {
        type: Number,
        min: 0,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    latitude: {
        type: Number
    },

    longitude: {
        type: Number
    },

    country: {
        type: String,
        required: true
    },

    category: {
    type: String,
    enum: ["Beach", "Mountain", "City", "Luxury", "Countryside"],
    required: true
   },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})

//Handling deletion middleware

ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews }
        })
    }
})

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
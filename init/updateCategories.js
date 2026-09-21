const mongoose = require("mongoose");
const Listing = require("../models/listing/listing");

const dbUrl = "mongodb://127.0.0.1:27017/StayAdda";

const categories = {
    "Malibu": "Beach",
    "New York City": "City",
    "Aspen": "Mountain",
    "Florence": "City",
    "Portland": "City",
    "Cancun": "Beach",
    "Lake Tahoe": "Mountain",
    "Los Angeles": "City",
    "Verbier": "Mountain",
    "Serengeti National Park": "Countryside",
    "Amsterdam": "City",
    "Fiji": "Beach",
    "Cotswolds": "Countryside",
    "Boston": "City",
    "Bali": "Beach",
    "Banff": "Mountain",
    "Miami": "Beach",
    "Phuket": "Beach",
    "Scottish Highlands": "Mountain",
    "Dubai": "Luxury"
};

async function updateCategories() {

    await mongoose.connect(dbUrl);

    console.log("Connected to MongoDB");

    const listings = await Listing.find({});

    for (let listing of listings) {

        if (categories[listing.location]) {

            listing.category = categories[listing.location];

            await listing.save();

            console.log(
                `${listing.title} → ${listing.category}`
            );
        }
    }

    console.log("Categories updated successfully");

    mongoose.connection.close();
}

updateCategories();
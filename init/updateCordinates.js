const mongoose = require('mongoose');
const Listing = require('../models/listing/listing');


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/StayAdda");
    console.log("Connection Successful");

    const coordinates = {
        "Malibu": [34.0259, -118.7798],
        "New York City": [40.7128, -74.0060],
        "Aspen": [39.1911, -106.8175],
        "Florence": [43.7696, 11.2558],
        "Portland": [45.5152, -122.6784],
        "Cancun": [21.1619, -86.8515],
        "Lake Tahoe": [39.0968, -120.0324],
        "Los Angeles": [34.0522, -118.2437],
        "Verbier": [46.0962, 7.2286],
        "Serengeti National Park": [-2.3333, 34.8333],
        "Amsterdam": [52.3676, 4.9041],
        "Fiji": [-17.7134, 178.0650],
        "Cotswolds": [51.8330, -1.8433],
        "Boston": [42.3601, -71.0589],
        "Bali": [-8.4095, 115.1889],
        "Banff": [51.1784, -115.5708],
        "Miami": [25.7617, -80.1918],
        "Phuket": [7.8804, 98.3923],
        "Scottish Highlands": [57.1200, -4.7100],
        "Dubai": [25.2048, 55.2708]
    };

      const listings = await Listing.find({});

    for (let listing of listings) {

        const location = coordinates[listing.location];

        if (location) {
            listing.latitude = location[0];
            listing.longitude = location[1];

            await listing.save();
        }
    }

    console.log("Coordinates Updated Successfully!");

    await mongoose.connection.close();
}

main().catch((err) => {
    console.log(err);
});

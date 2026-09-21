const geocode = async (location) => {

    const url =
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;

    const response = await fetch(url, {
        headers: {
            "User-Agent": "StayAdda/1.0"
        }
    });

    const data = await response.json();

    if (data.length === 0) {
        return null;
    }

    return {
        latitude: Number(data[0].lat),
        longitude: Number(data[0].lon)
    };
};

module.exports = geocode;
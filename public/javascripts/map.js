const mapElement = document.getElementById("map");

if (mapElement) {
    const latitude = Number(mapElement.dataset.latitude);
    const longitude = Number(mapElement.dataset.longitude);

    const listingTitle = mapElement.dataset.title;
    const listingLocation = mapElement.dataset.location;
    const listingPrice = Number(mapElement.dataset.price);
    const listingId = mapElement.dataset.id;




    const map = L.map("map").setView([latitude,longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

      const coralIcon = L.divIcon({
        className: "coral-marker",
        html: `<div class="marker-pin"></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -42]
    });

    L.marker([latitude,longitude],{icon: coralIcon})
        .addTo(map)
        .bindPopup(
            `
            <div class="stayadda-popup">

                <div class="popup-badge">
                    STAYADDA
                </div>

                <h3>${listingTitle}</h3>

                <p class="popup-location">
                    📍 ${listingLocation}
                </p>

                <div class="popup-price">
                    ₹${listingPrice.toLocaleString("en-IN")}
                    <span>/ night</span>
                </div>

                <a href="/listings/${listingId}" class="popup-btn">
                    View Listing
                </a>

            </div>
            `
            
        )
        .openPopup();
}
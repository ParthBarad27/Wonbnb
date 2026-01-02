// mapToken and listingData are already defined in the show.ejs file
console.log("map.js loaded, mapToken:", mapToken);
console.log("map.js loaded, listingData:", listingData);

if (!mapToken) {
    console.error("mapToken is not defined");
}

if (!listingData) {
    console.error("listingData is not defined");
}

mapboxgl.accessToken = mapToken;

try {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: listingData.coordinates,
        zoom: 9
    });

    // Add a marker at the location
    const marker = new mapboxgl.Marker({ color: '#fe424d' })
        .setLngLat(listingData.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h6>${listingData.title}</h6><p>${listingData.location}</p>`)
        )
        .addTo(map);
    
    console.log("Map initialized successfully");
} catch (error) {
    console.error("Error initializing map:", error);
}

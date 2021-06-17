let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.352271, lng: -71.05524200000001 },
        zoom: 14,
    });
    const carIcon = "https://tuftsdev.github.io/WebEngineering/assignments/summer2021/car.png";
    const cars = 
    [
        new google.maps.Marker({
            position: { lat: 42.3453, lng: -71.0464 },
            map: map,
            icon: carIcon,

            store_id: "mXfkjrFw",
        }),
        new google.maps.Marker({
            position: { lat: 42.3662, lng: -71.0621 },
            map: map,
            icon: carIcon,

            store_id: "nZXB8ZHz",
        }),
        new google.maps.Marker({
            position: { lat: 42.3603, lng: -71.0547 },
            map: map,
            icon: carIcon,

            store_id: "Tkwu74WC",
        }),
        new google.maps.Marker({
            position: { lat: 42.3472, lng: -71.0802 },
            map: map,
            icon: carIcon,

            store_id: "5KWpnAJN",
        }),
        new google.maps.Marker({
            position: { lat: 42.3663, lng: -71.0544 },
            map: map,
            icon: carIcon,

            store_id: "uf5ZrXYw",
        }),
        new google.maps.Marker({
            position: { lat: 42.3542, lng: -71.0704 },
            map: map,
            icon: carIcon,

            store_id: "VMerzMH8",
        })
    ];
}

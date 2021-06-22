let map;

var my_latitude, my_longitude;

// callbacks for navigator.geolocation.getCurrentPosition()
function posSuccess(gpos)
{
    userLoc = new google.maps.LatLng(gpos.coords.latitude, gpos.coords.longitude);
    map.setCenter(userLoc);
}
function posError(err) { console.log("there was an error getting pos", err.message); }

function initMap()
{
    map = new google.maps.Map(document.getElementById("map"), {
        // map will start at south station in boston, then shift to user's location
        center: { 
            lat: 42.352271,
            lng: -71.05524200000001
        },
        zoom: 14,
    });
    navigator.geolocation.getCurrentPosition(posSuccess, posError);
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


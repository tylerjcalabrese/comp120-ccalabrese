let map;
let markers;
let userLoc;
let userMarker;
let infowindow;

const carIcon = "https://tuftsdev.github.io/WebEngineering/assignments/summer2021/car.png";

function milesFromMeters(meters)
{
    return meters / 1609.34;
}

function markSelfWithClosestCar(cars)
{
    userMarker = new google.maps.Marker({
        map : map,
        position : userLoc
    });
    let userLat = userLoc.lat, userLng = userLoc.lng;
    let closest = cars[0];
    cars.forEach((car) => {
        if (google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng({lat : car.position.lat, lng : car.position.lng}),
                new google.maps.LatLng({lat : userLat, lng : userLng})) <
            google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng({lat : closest.position.lat, lng : closest.position.lng}),
                new google.maps.LatLng({lat : userLat, lng : userLng}))) closest = car;
    });

    let closestDistance = milesFromMeters(google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng({lat : closest.position.lat, lng : closest.position.lng}),
            new google.maps.LatLng({lat : userLat, lng : userLng}))).toFixed(0);
    let infoString = "The closest car is at (" + closest.position.lat + ", " + closest.position.lng +
            "), and is " + closestDistance + " miles away.";
    infowindow = new google.maps.InfoWindow({
        content : infoString,
    });
    userMarker.addListener("click", () => {
        infowindow.open({
            anchor : userMarker,
            map : map,
        });
    });
    new google.maps.Polyline({
        map : map,
        path : [
            { lat : userLoc.lat, lng : userLoc.lng },
            { lat : closest.position.lat, lng : closest.position.lng }
        ]
    });
}

// callbacks for navigator.geolocation.getCurrentPosition()
function posSuccess(gpos)
{
    userLoc = {lat : gpos.coords.latitude, lng : gpos.coords.longitude};
    map.setCenter(userLoc);

    // try out the API
    xhr = new XMLHttpRequest;
    xhr.open("POST", "https://jordan-marsh.herokuapp.com/rides");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let cars = JSON.parse(xhr.responseText);

            markers = cars.map((car) => {
                return {
                    map : map,
                    position : { lat : car.lat, lng : car.lng },
                    icon : carIcon,
                    id : car.id,
                    username : car.username,
                    created_on : car.created_on
                }
            });
            markers.forEach((m) => {
                new google.maps.Marker(m);
            });
            markSelfWithClosestCar(markers);
        }
    };
    let reqParams = "username=xXoDw780&lat=" + gpos.coords.latitude + "&lng=" + gpos.coords.longitude;

    console.log("sending API request");
    xhr.send(reqParams);
}
function posError(err) { console.log("there was an error getting pos", err.message); }

function initMap()
{
    navigator.geolocation.getCurrentPosition(posSuccess, posError);
    console.log("creating map");
    map = new google.maps.Map(document.getElementById("map"), {
        // map will start at south station in boston, then shift to user's location
        center: { 
            lat: 42.352271,
            lng: -71.05524200000001
        },
        zoom: 12,
    });
}


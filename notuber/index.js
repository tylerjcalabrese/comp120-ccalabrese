let map;
let markers;
let userLoc;
let userMarker;
let infowindow;

const carIcon = "https://tuftsdev.github.io/WebEngineering/assignments/summer2021/car.png";

function distanceFromUser(marker)
{
    return milesFromMeters(google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng({lat : marker.position.lat(), lng : marker.position.lng()}),
            new google.maps.LatLng({lat : userLoc.lat, lng : userLoc.lng})));
}

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
    let closest = cars[0];
    cars.forEach((car) => {
        if (distanceFromUser(car) <
            distanceFromUser(closest)) closest = car;
    });

    console.log(closest);

    let infoString = "The closest car is at (" + closest.position.lat() + ", " + closest.position.lng() +
            "), and is " + distanceFromUser(closest).toFixed(0) + " miles away.";
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
            { lat : closest.position.lat(), lng : closest.position.lng() }
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
    xhr.open("POST", "https://evening-basin-73308.herokuapp.com/rides");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let cars = JSON.parse(xhr.responseText);

            markerinfo = cars.map((car) => {
                return {
                    map : map,
                    position : { lat : car.lat, lng : car.lng },
                    icon : carIcon,
                    id : car.id,
                    username : car.username,
                    created_on : car.created_on
                }
            });
            mapmarkers = markerinfo.map((m) => {
                return new google.maps.Marker(m);
            });
            mapmarkers.forEach((m) => {
                let iw = new google.maps.InfoWindow({
                    content : distanceFromUser(m).toFixed(0) + " miles away",
                });
                m.addListener("click", () => {
                    iw.open({
                        anchor : m,
                        map : map,
                    });
                });
            });
            markSelfWithClosestCar(mapmarkers);
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


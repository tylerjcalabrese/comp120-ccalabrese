let map;


const carIcon = "https://tuftsdev.github.io/WebEngineering/assignments/summer2021/car.png";

// callbacks for navigator.geolocation.getCurrentPosition()
function posSuccess(gpos)
{
    userLoc = new google.maps.LatLng(gpos.coords.latitude, gpos.coords.longitude);
    map.setCenter(userLoc);

    // try out the API
    xhr = new XMLHttpRequest;
    xhr.open("POST", "https://jordan-marsh.herokuapp.com/rides");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let cars = JSON.parse(xhr.responseText);

            let markers = cars.map((car) => {
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
        }
    };
    let reqParams = "username=xXoDw780&lat=" + gpos.coords.latitude + "&lng=" + gpos.coords.longitude;

    xhr.send(reqParams);
}
function posError(err) { console.log("there was an error getting pos", err.message); }

function initMap()
{
    navigator.geolocation.getCurrentPosition(posSuccess, posError);
    map = new google.maps.Map(document.getElementById("map"), {
        // map will start at south station in boston, then shift to user's location
        center: { 
            lat: 42.352271,
            lng: -71.05524200000001
        },
        zoom: 14,
    });
}


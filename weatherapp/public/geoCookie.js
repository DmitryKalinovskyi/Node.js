function cookiesAsObject(){
    let tokens = document.cookie.split(';');

    const cook = {};
    for(let token of tokens){
        let [key, value] = token.split('=');

        key = key.trim();
        cook[key] = value;
    }

    return cook;
}

function sendGeolocationIfRequired() {
    return navigator.geolocation.getCurrentPosition(function(result) {
        // check whether cookie information is the same
        console.log(window.location)

        // localStorage.clear();
        // document.cookie = "";

        // const latitude1 = +(localStorage.getItem("latitude"));
        // const longitude1 = +(localStorage.getItem("longitude"));

        let cookies = cookiesAsObject();
        console.log(cookies);
        const lat = result.coords.latitude
        const lon = result.coords.longitude

        let updated = false;
        if(+(cookies.lat) !== lat) {

            document.cookie = `lat=${lat};`;
            updated = true;
        }

        if(+(cookies.lon) !== lon){
            document.cookie = `lon=${lon};`;
            updated = true;
        }

        if(updated)
            window.location.replace(window.location.href);
    });
}

// if user don't allowed geolocation, just ignore
function applyGeolocation() {
    if (navigator.geolocation) {
        console.log("Geolocation is supported by this browser :)");
        sendGeolocationIfRequired();
    } else {
        console.log("Geolocation is NOT supported by this browser :(");
    }
}

applyGeolocation()
// after used allowed, we should check, is actual page contains
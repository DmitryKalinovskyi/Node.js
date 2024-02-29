const express = require('express')
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
let app = express();

const IS_DEBUG = true;

app.use(express.json());
app.use(cookieParser());

// configure hbs
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('celsia', function(arg1) {
    return Math.round(arg1-272.15) + " C°";
});


// bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

function loadAsObjectFrom(path){
    return JSON.parse(fs.readFileSync(path).toString());
}

// setup global variables
const config = loadAsObjectFrom('config.json');
const config_secret = loadAsObjectFrom('config-secret.json');

app.get('/', (req, res) => {
    res.send("Hello, Express");
});

// test route
app.get('/login', (req, res) => {
    res.send("Hello, Express");
});

app.get('/weather', async (req, res) => {

    console.log(req.cookies);

    if(req.cookies?.lat  &&  req.cookies?.lon){
        // find city by geolocation

        const city = await getCityByGeolocation(req.cookies.lat, req.cookies.lon);
        console.log(city);

        const weather = await getWeatherFromCity(city);

        res.render('main.hbs', {weather, city})
    }
    else{
        res.render('main.hbs');

    }
});

async function getWeatherFromCity(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config_secret.api}`)
    return await response.json();
}

async function getCityByGeolocation(lat, lon){
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${config_secret.api}`);

    return (await response.json())[0].name;
}

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const cities = config.cities;

     if(cities.includes(city) === false){
         res.sendStatus(404);
         return;
     }
     try{
        const weather = await getWeatherFromCity(city);
        console.log(weather);

        res.render('weather.hbs', {weather, cities, city});
     }catch (e){
         if(IS_DEBUG){
             res.send(e.message)
         }
         else{
            res.send("Internal server error");
         }
     }
});


app.listen(49001, "127.0.0.1", () => {
    console.log("Example app listening on port 49001 (updated version)");
});


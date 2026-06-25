const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

async function getWeather(){

const city = document.getElementById("cityInput").value.trim();

const card = document.getElementById("weatherCard");
const loader = document.getElementById("loader");
const error = document.getElementById("error");

error.textContent = "";

if(city === ""){
error.textContent = "Please enter a city name";
return;
}

loader.classList.remove("hidden");
card.classList.add("hidden");

try{

const response = await fetch(
`https://wttr.in/${city}?format=j1`
);

if(!response.ok){
throw new Error("Failed");
}

const data = await response.json();

const weather = data.current_condition[0];

document.getElementById("cityName").textContent = city;

document.getElementById("temp").textContent =
weather.temp_C + " °C";

document.getElementById("humidity").textContent =
weather.humidity + " %";

document.getElementById("wind").textContent =
weather.windspeedKmph + " km/h";

document.getElementById("weatherIcon").src =
weather.weatherIconUrl[0].value;

document.getElementById("dateTime").textContent =
new Date().toLocaleString();

card.classList.remove("hidden");

}
catch(err){

error.textContent =
"Unable to fetch weather data. Try again.";

}
finally{

loader.classList.add("hidden");

}

}
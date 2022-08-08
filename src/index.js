let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = document.querySelector("#date-time");
date.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
            <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            <img class="forecast-icon" src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"/>
            <p class="forecast-max">${Math.round(forecastDay.temp.max)}°</p>
            <p class="forecast-min">${Math.round(forecastDay.temp.min)}°</p>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "cf8b5baa824d961b33e0cb48813022bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Display temperature of searched city

function displayTemperature(response) {
  let temperature = celsiusTemperature;
  let h1Element = document.querySelector("#temperature");
  h1Element.innerHTML = temperature;

  let cityElement = document.querySelector("#searched-city");
  cityElement.innerHTML = response.data.name;

  let skyElement = document.querySelector("#sky-description");
  skyElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "cf8b5baa824d961b33e0cb48813022bf";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-bar");
  searchCity(inputCity.value);
}

let newCity = document.querySelector("#search-box");
newCity.addEventListener("submit", handleSubmit);

//Convert temperature in Fahrenheit
function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector("#temperature");
  // remove the active class on the celsius unit
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  fahrenheitElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelsius(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  let celsiusElement = document.querySelector("#temperature");
  celsiusElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let fahrenheitUnit = document.querySelector("#fahrenheit");
fahrenheitUnit.addEventListener("click", convertFahrenheit);

let celsiusUnit = document.querySelector("#celsius");
celsiusUnit.addEventListener("click", convertCelsius);

searchCity("Paris");

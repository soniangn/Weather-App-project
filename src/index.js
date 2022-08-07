//Display Date and Time
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

//Display forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col">
            <p class="forecast-day">${day}</p>
            <img class="forecast-icon" src="https://img.icons8.com/color/48/000000/sun--v1.png"/>
            <p class="forecast-max">31°C</p>
            <p class="forecast-min">18°C</p>
        </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Display temperature of searched city

function displayTemperature(response) {
  let temperature = celsiusTemperature;
  let h1Element = document.querySelector("#temperature");
  h1Element.innerHTML = temperature;

  let cityElement = document.querySelector("#searched-city");
  cityElement.innerHTML = response.data.name;
  console.log(response);

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
displayForecast();

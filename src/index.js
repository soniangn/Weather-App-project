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

//Display temperature of searched city

function displayTemperature(response) {
  let temperature = response.data.main.temp;
  let h1Element = document.querySelector("#temperature");
  h1Element.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#searched-city");
  cityElement.innerHTML = response.data.name;
  console.log(response);

  let skyElement = document.querySelector("#sky-description");
  skyElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
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

searchCity("Paris");

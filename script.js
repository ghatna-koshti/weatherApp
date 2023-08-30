const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const weather_body = document.querySelector(".weather-body");
const location_not_found = document.querySelector(".location-not-found");
let container = document.querySelector('.container')

async function checkWeather(city) {
  const api_key = "754ac43fb9d26fdc73a1bf10092612fc";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(url).then((response) => response.json());
  console.log(weather_data);

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    container.style.background = "linear-gradient(to bottom, #E0E0E0, #F0F0F0)"
    return;
  }

  container.style.background = "linear-gradient(to bottom, #89d8f8, #E1F5FE, #FFFFFF)";


  weather_body.style.display = "flex";
  location_not_found.style.display = "none";

  temperature.innerHTML = `${Math.round(
    weather_data.main.temp - 273.15
  )}<sup>°C</sup>`;

  description.innerHTML = `${weather_data.weather[0].description}`;

  humidity.innerHTML = `${weather_data.main.humidity}%`;

  wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;
  console.log(weather_data);



  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "/weatherApp/assets/cloud.png";
      break;
    case "Clear":
      weather_img.src = "/weatherApp/assets/clear.png";
      break;
    case "Rain":
      weather_img.src = "/weatherApp/assets/rain.png";
      break;
    case "Mist":
      weather_img.src = "/weatherApp/assets/mist.png";
      break;
    case "Snow":
      weather_img.src = "/weatherApp/assets/snow.png";
      break;
    
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

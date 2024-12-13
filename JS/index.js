const apiKey = "8baba918ee7757b5d961432bf0ebc08b";
const searchButton = document.getElementById("searchBtn");
const searchInput = document.querySelector("#search");
fetchWeather("paris");

searchInput.addEventListener("keyup", () => {
  console.log("listen o button");
  const location = searchInput.value.trim();
  if (location) {
    console.log("location");
    fetchWeather(location);
  } 
});

function fetchWeather(location) {
  console.log("weather");
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "200") {
        updateWeatherCards(data);
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}



function updateWeatherCards(data) {
  console.log("koko");
  const today = data.list[0];
  const tomorrow = data.list[8];
  const dayAfterTomorrow = data.list[16];
  const cityName = data.city.name;

  updateCard("#day1", today, cityName);

  updateCard("#day2", tomorrow, cityName);

  updateCard("#day3", dayAfterTomorrow, cityName);
}

function updateCard(selector, weatherData, cityName) {
  const card = document.querySelector(selector);
  if (card) {
    const iconCode = weatherData.weather[0].icon; 
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const iconElement = card.querySelector(".weather-icon");
    if (iconElement) {
      iconElement.innerHTML = `<img src="${iconURL}" alt="Weather Icon" />`;
    }

    const weatherDesc = card.querySelector(".day-weather");
    if (weatherDesc) {
      weatherDesc.textContent = weatherData.weather[0].description;
    }

    const tempElement = card.querySelector(".day-temp");
    if (tempElement) {
      tempElement.textContent = `Temp: ${weatherData.main.temp}°C`;
    }

    const cityElement = card.querySelector(".day-city");
    if (cityElement) {
      cityElement.textContent = cityName;
    }
  } else {
    console.error(`Card with selector ${selector} not found.`);
  }
}




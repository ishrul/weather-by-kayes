const loadWeather = () => {
  const weatherInput = document.getElementById("weather-input").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=65dbcdf30641cc0aca1ae460c8b56937`
  )
    .then((res) => res.json())
    .then((data) => displayWeather(data));
  document.getElementById("weather-input").value = "";
};

const displayWeather = (city) => {
  const weatherSec = document.getElementById("weather-sec");
  weatherSec.textContent = "";
  const div = document.createElement("div");
  div.classList.add("weather-div");
  const temprature = city.main.temp - 273.15;
  console.log();
  div.innerHTML = `
          <h2>${city.name}</h2>
          <h4>${city.sys.country}</h4>
          <h3>${Math.round(temprature)}°C</h3>
          <h5>${city.weather[0].main}</h5>
  `;
  weatherSec.appendChild(div);
};

const weatherInput = document.getElementById("weather-input");
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=65dbcdf30641cc0aca1ae460c8b56937`
)
  .then((res) => res.json())
  .then((data) => displayWeather(data));
weatherInput.value = "";
// click funcion of search button
const loadWeather = () => {
  const weatherInput = document.getElementById("weather-input");
  const weantherInputValue = weatherInput.value;
  if (weantherInputValue.length > 0) {
    document.getElementById("spinner").classList.remove("d-none");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${weantherInputValue}&appid=65dbcdf30641cc0aca1ae460c8b56937`
    )
      .then((res) => res.json())
      .then((data) => displayWeather(data));
  } else if (weantherInputValue === "") {
    document.getElementById("weather-sec").innerHTML = `
    <div id="empty" class="text-center fs-3 ">
        Please enter your city name!!!
      </div>
    `;
  }
};

// triger to enter button

const go = document.getElementById("search-btn");
const txt = document.getElementById("weather-input");

txt.addEventListener("keypress", function (event) {
  if (event.key === "Enter") go.click();
});

const displayWeather = (city) => {
  const weatherSec = document.getElementById("weather-sec");
  weatherSec.textContent = "";
  console.log(city.cod);
  const div = document.createElement("div");

  document.getElementById("spinner").classList.add("d-none");
  if (city.cod === "404") {
    const weatherInput = document.getElementById("weather-input");
    document.getElementById("weather-sec").innerHTML = ` 
    <div id="wrong-name" class="text-center fs-3">
    Sorry! ${weatherInput.value} is not a city name!!!
    </div>
    `;
    console.log(div);
  } else {
    // const nowInLocalTime = Date.now() + 1000 * city.timezone;
    var nowInLocalTime = new Date(new Date().getTime() - city.timezone * 1000);
    const temprature = city.main.temp - 273.15;
    div.classList.add("weather-div");
    div.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${
      city.weather[0].icon
    }@2x.png" alt="">
    <h2>City: ${city.name}</h2>
    <h4>Country: ${city.sys.country}</h4>
    <h3>Temp: ${Math.round(temprature)}°C</h3>
    <h5>Weather: ${city.weather[0].description}</h5>
    <p><strong>Date:</strong>  ${nowInLocalTime}</p>
    `;
  }
  document.getElementById("weather-input").value = "";
  weatherSec.appendChild(div);
};

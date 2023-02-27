function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours <10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
 
    return `${day} ${hours}:${minutes}`;
    }

    function displayForecast(response) {
        console.log(response.data.daily);
        let forecastElement = document.querySelector("#forecast");
    
        let forecastHTML = `<div class="row">`;
        let days = ["Mon", "Tues", "Wed"];
        days.forEach(function (day) {
        
        forecastHTML = forecastHTML + 
        `
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img src="media/partly_cloudy.png" alt="" width="42">
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">6°</span>
                <span class="weather-forecast-temperature-min">-3°</span>
              </div>
            </div>
        `;
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
      }

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
    let apiUrl = `http:api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}
      
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#now-temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#current-date-time");
    let iconElement =  document.querySelector("#icon");
    
    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city) {
let apiKey = "4bd54384cf14cca162b7f2304d56c5ce";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function showFahrenheitTemp(event) {
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#now-temp");
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#now-temp");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTemp);


search("Waterloo");

const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  const loading = document.getElementById('loading');
  const errorMessage = document.getElementById('error-message');
  
  loading.style.display = "block";  // Show loading message
  errorMessage.style.display = "none";  // Hide error message

  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(displayResults)
    .catch(() => {
      errorMessage.style.display = "block";
      errorMessage.innerText = "City not found. Please try again.";
    })
    .finally(() => {
      loading.style.display = "none"; 
    });
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  let weatherIcon = document.getElementById('weather-icon');
  weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  changeBackground(weather.weather[0].main);
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function changeBackground(weatherCondition) {
  const body = document.body;

  switch (weatherCondition.toLowerCase()) {
    case "clear":
      body.style.background = "linear-gradient(45deg, #ff9a9e, #fad0c4)";
      break;
    case "clouds":
      body.style.background = "linear-gradient(45deg, #a1c4fd, #c2e9fb)";
      break;
    case "rain":
      body.style.background = "linear-gradient(45deg, #667db6, #0082c8)";
      break;
    case "snow":
      body.style.background = "linear-gradient(45deg, #e6dada, #274046)";
      break;
    case "thunderstorm":
      body.style.background = "linear-gradient(45deg, #1e130c, #9a8478)";
      break;
    default:
      body.style.background = "linear-gradient(45deg, #1e3c72, #2a5298)";
  }
}

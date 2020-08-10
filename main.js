var historyBox = document.querySelector("#history");
var historyTempBox = document.querySelector("#history");
var searchbox = document.querySelector(".search-box");
var button = document.querySelector("#clearBtn");
var clearbuttonf1 = document.querySelector("#clearBtnf1");
var clearbuttonf2 = document.querySelector("#clearBtnf2");
var clearbuttonf3 = document.querySelector("#clearBtnf3");
var favbutton = document.querySelector("#favBtn");

if (localStorage.length != 0) {
  for (var i = 0; i < localStorage.length; i++) {
    historyBox.append(localStorage.key(i) + "\n");
    historyTempBox.append(localStorage.getItem(localStorage.key(i)) + "\n");
  }
} else if (localStorage.length > 10) {
  localStorage.clear();
}

button.onclick = function () {
  localStorage.clear();
  location.reload();
};

var api = {
  key: "d2d5b843dab8a5e76637c4d5b8d9c423",
  url: "https://api.openweathermap.org/data/2.5/",
};

searchbox.addEventListener("keypress", setQuery);
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.url}/weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  var city = document.querySelector(".city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  var today = new Date();
  var date = document.querySelector(".date");
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  date.innerText = time + ", " + dateBuilder(today);

  var temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  var weatherf = document.querySelector(".weather");
  weatherf.innerText = weather.weather[0].main;

  var wind = document.querySelector(".wind");
  wind.innerText = `${weather.wind.speed} m/s`;

  var pressure = document.querySelector(".pressure");
  pressure.innerText = `${weather.main.pressure} hPa`;

  var hilow = document.querySelector(".max-min");
  hilow.innerText = `${Math.round(weather.main.temp_max)}°C / ${Math.round(
    weather.main.temp_min
  )}°C`;
  localStorage.setItem(
    "City:" + weather.name,
    "Temp: " + Math.round(weather.main.temp) + "°C"
  );
  var additem =
    "City:" +
    weather.name +
    " " +
    "Temp: " +
    Math.round(weather.main.temp) +
    "°C" +
    "\n";
  historyBox.append(additem);

  var cityf1 = document.querySelector(".cityf1");
  var tempf1 = document.querySelector(".tempf1");
  var hilowf1 = document.querySelector(".max-minf1");
  var weatherf1 = document.querySelector(".weatherf1");
  var cityf2 = document.querySelector(".cityf2");
  var tempf2 = document.querySelector(".tempf2");
  var hilowf2 = document.querySelector(".max-minf2");
  var weatherf2 = document.querySelector(".weatherf2");
  var cityf3 = document.querySelector(".cityf3");
  var tempf3 = document.querySelector(".tempf3");
  var hilowf3 = document.querySelector(".max-minf3");
  var weatherf3 = document.querySelector(".weatherf3");

  favbutton.onclick = function () {
    if (cityf1.innerText == `City, Country`) {
      cityf1.innerText = `${weather.name}, ${weather.sys.country}`;
      tempf1.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
      weatherf1.innerText = weather.weather[0].main;
      hilowf1.innerText = `${Math.round(
        weather.main.temp_max
      )}°C / ${Math.round(weather.main.temp_min)}°C`;
    } else if (cityf2.innerText == `City, Country`) {
      cityf2.innerText = `${weather.name}, ${weather.sys.country}`;
      tempf2.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
      weatherf2.innerText = weather.weather[0].main;
      hilowf2.innerText = `${Math.round(
        weather.main.temp_max
      )}°C / ${Math.round(weather.main.temp_min)}°C`;
    } else if (cityf3.innerText == `City, Country`) {
      cityf3.innerText = `${weather.name}, ${weather.sys.country}`;
      tempf3.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
      weatherf3.innerText = weather.weather[0].main;
      hilowf3.innerText = `${Math.round(
        weather.main.temp_max
      )}°C / ${Math.round(weather.main.temp_min)}°C`;
    }
  };
  clearbuttonf1.onclick = function () {
    cityf1.innerText = `City, Country`;
    tempf1.innerText = `Temperature`;
    weatherf1.innerText = `Weather`;
    hilowf1.innerText = `Max / Min`;
  };
  clearbuttonf2.onclick = function () {
    cityf2.innerText = `City, Country`;
    tempf2.innerText = `Temperature`;
    weatherf2.innerText = `Weather`;
    hilowf2.innerText = `Max / Min`;
  };
  clearbuttonf3.onclick = function () {
    cityf3.innerText = `City, Country`;
    tempf3.innerText = `Temperature`;
    weatherf3.innerText = `Weather`;
    hilowf3.innerText = `Max / Min`;
  };
}

function dateBuilder(dat) {
  var days = [
    "Sunday,",
    "Monday,",
    "Tuesday,",
    "Wednesday,",
    "Thursday,",
    "Friday,",
    "Saturday,",
  ];

  var months = [
    "January,",
    "February,",
    "March,",
    "April,",
    "May,",
    "June,",
    "July,",
    "August,",
    "September,",
    "October,",
    "November,",
    "December,",
  ];

  var day = days[dat.getDay()];
  var date = dat.getDate();
  var month = months[dat.getMonth()];
  var year = dat.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

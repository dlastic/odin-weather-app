const weatherForm = document.querySelector("#weather-form");

async function getWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=WAMUABBMYKU3Z2BQNSJP2BMFD`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function getCurrentConditions(data) {
  const { temp, conditions, feelslike, windspeed, humidity } =
    data.currentConditions;
  return { temp, conditions, feelslike, windspeed, humidity };
}

function getInputValue(form, name) {
  const myForm = new FormData(form);
  return myForm.get(name);
}

async function showConditions() {
  const data = await getWeatherData(getInputValue(weatherForm, "location"));
  const conditions = getCurrentConditions(data);
  console.log(conditions);
}

function bindEvents() {
  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showConditions();
  });
}

bindEvents();

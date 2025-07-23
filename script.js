const weatherForm = document.querySelector("#weather-form");
const resultsContainer = document.querySelector("#weather-results");

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

async function fetchConditions(location) {
  try {
    const data = await getWeatherData(location);
    return getCurrentConditions(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

function renderConditions(conditions) {
  resultsContainer.innerHTML = "";
  if (!conditions) {
    resultsContainer.textContent = "No data available.";
    return;
  }

  const createListItem = (label, value) => {
    const li = document.createElement("li");
    li.textContent = `${label}: ${value}`;
    return li;
  };

  const title = document.createElement("h2");
  const list = document.createElement("ul");
  title.textContent = "Current Conditions";

  list.appendChild(createListItem("Conditions", conditions.conditions));
  list.appendChild(createListItem("Temperature", `${conditions.temp} °F`));
  list.appendChild(createListItem("Feels Like", `${conditions.feelslike} °F`));
  list.appendChild(createListItem("Wind Speed", `${conditions.windspeed} m/h`));
  list.appendChild(createListItem("Humidity", `${conditions.humidity} %`));
  resultsContainer.appendChild(title);
  resultsContainer.appendChild(list);
}

async function handleWeatherSearch() {
  const location = getInputValue(weatherForm, "location");
  const conditions = await fetchConditions(location);
  renderConditions(conditions);
}

function bindEvents() {
  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleWeatherSearch();
  });
}

bindEvents();

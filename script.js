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

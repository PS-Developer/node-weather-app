const request = require("request");

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f353cdea3172ce710a157798fad3f64c&query=${lat},${lon}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out and feels like ${body.current.feelslike} degrees out. The humidity level is ${body.current.humidity}% and there is a ${body.current.precip}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;

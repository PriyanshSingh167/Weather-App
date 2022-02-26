// Links:
// https://openweathermap.org/api
// https://nodejs.org/api/https.html#https_https_get_url_options_callback

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "a69405ac810a0a56a040c14d78e75ca0";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q= " +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temperature in " + query + " is " + temp + "</h1>");
      res.write("<p>The weather is currently " + description + "<p>");
      res.write("<img src = " + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

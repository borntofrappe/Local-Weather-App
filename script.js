/*
Once the page loads, the page can show different content depending on the visitors' actions. A small reflection on the possible paths is warranted.

Weather data is predicated on access to location coordinates, so the content hinges on this choice.

1. In the most desirable path, the visitor allows access to location data, which in turn allows to retrieve weather location for the newfound latitude and longitude coordinates.
Once the visitor clicks to see the weather information, the page is now able to provide such data through the API request.

2. In the less desirable path, location access is not granted and weather data for the current location cannot be retrieved. One solution is to show the weather of a default city,
but I'd rather display a default message detailing how location was not granted and weather information cannot be estimated.

The possible paths in the webpage are detailed in the small graph found in Resources/Local Weather App Page Possibilities.png
*/


$(document).ready(function() {
  // get location data through the HTML request
  getLocation();
  // upon receiving a click event on the defined call-to-action, remove the introductory content to later show the weather content
  $(".action").on("click", removeIntroductoryContent);
  // listen on a click event on the temperature to toggle its unit of measure between celsius and fahhrenheit
  $(".weather-temperature").on("click", toggleTemperature);
});


/*
get location detailing what happens
  in case of success (user "allows" location),
  in case of failure ("block")

  in case geolocation is not made available (exception for quite old browser)
*/
function getLocation() {
  var latitude, longitude;
  function success(position) {
    // store latitude and longitude in two variables and get the weather for the detailed coordinates
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    // get weather for the estimated coordinates
    getWeather(latitude, longitude);
  }
  function failure() {
    // display the content of the second page detailing the missing information
    $(".weather-separator").text(" Not ");
    removeIntroductoryContent();
  }

  //
  if (navigator.geolocation) {
    /* geolocation is available */
    // get location
    navigator.geolocation.getCurrentPosition(success, failure);
  } else {
    /* geolocation IS NOT available */
    // alert for the missing feature
    alert("Geolocation is not available... guess that's the end of it :p");
  }
}

// get location through the FreeCodeCamp api, including latitude and longitude in the url call
function getWeather(latitude, longitude) {
  var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
  $.getJSON(url, function(json) {
    // console.log(json); show in the developer console to check the resul

    // include the text and icon from the api call in the content of the second page
    $(".weather-temperature").text(Math.round(json.main.temp) + "°C");
    $(".weather-icon").attr("src", json.weather[0].icon);
    $(".weather-location").text(json.name);
    $(".weather-main").text(json.weather[0].main);
  });
}

// fade out content of the first page and afterwards display the content of the second page (technically there's only one page, but one at a time)
// display weather is used as a callback function once the fadeOut is over
function removeIntroductoryContent() {
  $(".introductory-content").fadeOut("slow", displayWeather);
}
// display weather changing the background first (quick rough fix not required if the image is referenced locally/ in smaller resolution)
function displayWeather() {
  displayBackground();
  displayContainer();
}

// display weather container with a fade in animation and including a css property to show it to the right, occupying only as much as needed
function displayContainer() {
  $(".weather-content")
        .css("display", "inline-block")
        .fadeIn("slow");
}

// display background according to the weather condition
function displayBackground() {
  // arrays for backgrounds: clear, clouds, drizzle and rain, thunderstorm, snow, fog and mist, default weather images
  var arrayOfBackground =
  ["https://static.pexels.com/photos/34066/pexels-photo.jpg",
  "https://static.pexels.com/photos/449751/pexels-photo-449751.jpeg",
  "https://static.pexels.com/photos/17739/pexels-photo.jpg",
  "https://static.pexels.com/photos/255347/pexels-photo-255347.png",
  "https://static.pexels.com/photos/209839/pexels-photo-209839.jpeg",
  "https://static.pexels.com/photos/325185/pexels-photo-325185.jpeg",
  "https://static.pexels.com/photos/76969/cold-front-warm-front-hurricane-felix-76969.jpeg"
  ];

  // store in a variable the weather condition retrieved from the document
  var weatherCondition = $(".weather-main").text().toLowerCase();

  // depending on the value of weather-main change the background-image property to match the background to the current weather
  switch(weatherCondition) {
    case "clear":
      $("body")
          .css("background-image", "url(" + arrayOfBackground[0] + ")");
      break;
    case "clouds":
      $("body")
          .css("background-image", "url(" + arrayOfBackground[4] + ")");
      break;
    case "drizzle":
    case "rain":
      $("body")
          .css("background-image", "url(" + arrayOfBackground[2] + ")");
      break;
    case "thunderstorm":
      $("body")
          .css("background-image", "url(" + arrayOfBackground[3] + ")");
      break;
    case "snow":
      $("body")
          .css("background-image", "url(" + arrayOfBackground[4] + ")");
      break;
    case "fog":
    case "mist":
      $("body")
          .css("background-image", "url(" + arrayOfBackground[5] + ")");
      break;
    default:
      $("body")
          .css("background-image", "url(" + arrayOfBackground[6] + ")");
      break;
  }

}

// toggle between celsius and farenheit (F = C*9/5 + 32)
function toggleTemperature() {
  // store the temperature in a variable, then separate the digits from the unit in two distinct variables
  var temperature = $(this).text();
  // digits not including the last two characters, °C or °F
  var temperatureDigits = parseInt(temperature.substring(0,temperature.length-2));
  // last two characters, C° or F°
  var temperatureUnit = temperature[temperature.length-1];

  // if the unit is celsius change to farenheit; otherwise go the other way
  if(temperatureUnit == "C") {
    // math round to avoid mishaps between computations
    var temperatureFahrenheit  = Math.round(temperatureDigits * 9 / 5 + 32);
    $(this).text(temperatureFahrenheit + "°F");
  } else {
    temperatureCelsius = Math.round((temperatureDigits -32)*5/9);
    $(this).text(temperatureCelsius + "°C");
  }
}

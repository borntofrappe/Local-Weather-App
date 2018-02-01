# Local-Weather-App

## Live Example 

What follows is a semi-thorough description of the thought process behind the concoction of the *Local Weather App*. 

If you are just interested in results, check out this [pen](https://codepen.io/borntofrappe/full/MQaOJV) for a live demo. 

---

## The Task

Broadly speaking the goal is to build a *Local Weather App*, following [freecodecamp](https://www.freecodecamp.org/) line of challenges "Intermediate Front End Web Development Projects".

More specifically, the idea needs to manifest itself in a webpage where visitors should be able to assess the weather in their current location, through multiple visual cues: 

- an icon, which visually matches the weather;
- the current temperature, in a display which can be toggled between Celsius and Fahrenheit units of measure;
- a background, appropriate for the icon and weather condition.


## First Thoughts

The webpage hinges on two key actions:

1. get current location
2. get weather connected to such a position. 

The former bullet point is solved through the [HTML5 geolocation feature](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation), while the latter can be fulfilled thanks to the [freeCodeCamp Weather API](https://fcc-weather-api.glitch.me/), generously offered by freeCodeCamp itself.

Each step shall be discussed in the section regarding the technical implementation, but it is important to stress that the second point is dependant on the former. Without access to location it is not possible to retrieve relevant weather information and the webpage needs to account for such a possibillity. This is an important cosideration for the design of the page itself.

## The Design

To consider the possibility of not having access to location data, a debatable design choice is made to split the website structure into two. 

1. First, the visitor is greeted by an introductory page, informing about the utility of the page itself and prompting to retrieve weather data behind a call-to-action. This is where access to location is asked, before visitors express the willingness to access weather data.

2. Depending on the presence or lack of location access, the page then displays two different possibilities. 

    1. If access is not granted, a display will inform the user about the lack of location data, and about the futility of the page. 
    2. If access is indeed granted, weather information is retrieved. This will be displayed once the visitor explicitly goes through the call-to-action, directly inquiring for weather data.
  
If it seems a tad confusing the image found in the "Resources" folder, under the label of "Local Weather App Page Possibilities.png" might increase the understanding of the overly-convoluted structure.


Given this structure, it is therefore necessary to design three different pages, even if consistent in style. An extremely rudimentary mockup of the three can be found again in the Resources folder, under the respective labels of "Introductory Page", "Location not Available" and "Location Available".

Background images for the project are found on [Pexels](https://www.pexels.com/), simply searching for weather keywords.


## Technical Implementation

As previously stated, the page needs to retrieve location and weather data through the HTML geolocation feature and the freeCodeCamp weather API.

1. [Get Location](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)

    Following the very insightful reference from MDN, it is advisable to first to check for the availability of the navigator object, which provides location's services.

    ```js
    if (!navigator.geolocation) {
      /* geolocation is NOT available */
      console.log("Geolocation not supported by the browser!");
    } else {
      /* geolocation is available */
      console.log("Geolocation supported by the browser");
      console.log(navigator.geolocation);
    }
    ```

    If the browser supports such an object it is possible to then analyse its contents through a simple statement:

    ```js
    console.log(navigator.geolocation);
    ```

    Which returns the objects alongside the methods which can be implemented (see Resources/Geolocation Object.png for visual reference, and if you don't feel like trying out the code).

    Among these, `getCurrentPosition()` is the method necessary to retrieve the position's coordinates. 

    The method, as per [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition), accepts as arguments a callback function which runs in case of successful request, if the visitor grants access to his/her location. 
    It is also possible to specify another callback function, which runs when the visitor does not grant the request, as well as other optional arguments to specify [advanced options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions). 


    ```js
    navigator.geolocation.getCurrentPosition(successFunction, failureFunction, advancedOptions);
    ```

    In case of failure, it is possible to inform the visitor of the impossibility to retrieve his/her location

    ```js
    function failureFunction() {
      console.log("Unable to retrieve location, access denied");
    }
    ```

    But in case of success, it is indeed possible to retrieve location data, which can be analysed under the object name of position.

    ```js
    function successFunction(position) {
      console.log(position);
    }
    ```

    Wrapped all together, the simple, test-ready function to retrieve location looks as follows.

    ```js
    if (!navigator.geolocation) {
      /* geolocation is NOT available */
      console.log("Geolocation not supported by the browser!");
    } else {
      /* geolocation is available */
      console.log("Geolocation supported by the browser");
      console.log(navigator.geolocation);


      navigator.geolocation.getCurrentPosition(successFunction, failureFunction);
    }

    function failureFunction() {
      console.log("Unable to retrieve location, access denied");
    }
    function successFunction(position) {
      console.log(position);
    }
    ```

    In the developer console (or wherever the code might be tested), this code will:

    1. assess the availability of the geolocation object, 
    2. ask for access to the visitor's location, assuming the object's availability and
    3. display the position object, assuming access to location data

    The `position` object provides several values under the property of `coords`, to describe the specifics of the location: accuracy, altitude, altitudeAccuracy. Most importantly for our use case, it provides also latitude and longitude.

    Values which can be clearly reviewed with the simple statement(s):

    ```
    function successFunction(position) {
      console.log(position);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    }
    ```

2. [Get Weather](https://fcc-weather-api.glitch.me/)

    Assuming that the browser has access to the location of the visitor, and proofing the code for all possible outcomes in the described code, it is possible to move beyond the first technical feat to retrieve weather data.

    The weather API provided by [freeCodeCamp](https://fcc-weather-api.glitch.me/) is fortunately as straightforward as useful.

    Through a JSON call it is possible to reference the url https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139, specify the latitude and longitude directly in the url under the labels of lat and lon and already retrieve a JSON object with the weather data for the desired location.

    ```js
    function getWeather() {
      var url = "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139";
      $.getJSON(url, function(json) {
        console.log(json);
      });
    }
    ```

    The JSON object returned looks as follows 

    ```js
    { "coord":{ "lon":159, "lat":35 }, "weather":[ { "id":500, "main":"Rain", "description":"light rain", "icon":"https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399" } ], "base":"stations", "main":{ "temp":22.59, "pressure":1027.45, "humidity":100, "temp_min":22.59, "temp_max":22.59, "sea_level":1027.47, "grnd_level":1027.45 }, "wind":{ "speed":8.12, "deg":246.503 }, "rain":{ "3h":0.45 }, "clouds":{ "all":92 }, "dt":1499521932, "sys":{ "message":0.0034, "sunrise":1499451436, "sunset":1499503246 }, "id":0, "name":"", "cod":200 }
    ```

    And, for our limited use case, provides valuable information under the following properties:

    - json.weather[0].main; describing the weather condition;
    - json.weather[0].
    - json.name, from which we can infer the city's/ village's name
    - json.weather[0].icon, where it is possible to retrieve a png image for the icon matching the weather

    Simple enough.

    For our particular end case, the final, marginal step is to include the latitude and longitude retrieved through the previous chunk of code. It is possible to input as parameters the values obtained from the position object, directly in the JSON function:

    ```js
    function getWeather(latitude, longitude) {}
    ```

    and include their presence in the url through string concatenation:

    ```js
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
    ```

Which concludes the perhaps rambling, hopefully of some value discussion regarding the technical implementation. The code in the HTML, CSS, JS files will be likewise documented, so this might have been overkill, but it sure has helped me understand how to implement the different functions.


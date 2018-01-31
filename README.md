# Local-Weather-App

## The Task

Broadly speaking the pursuit is to build a *Local Weather App*, following [freecodecamp](https://www.freecodecamp.org/) line of challenges "Intermediate Front End Web Development Projects".

More specifically, the idea needs to manifest itself in a webpage where visitors should be able to assess the weather in the current location, through multiple visual cues: 

- an icon which visually matches the weather;
- the current temperature, in a display which can toggled between Celsius and Fahrenheit units of measure;
- a background appropriate for the icon and weather.


## Technical Implementation

The webpage depends on two key actions:

1. get current location
2. get weather connected to such a place 

The former bullet point is solved through the [HTML5 geolocation feature](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation), while the latter can be fulfilled thanks to the [freeCodeCamp Weather API](https://fcc-weather-api.glitch.me/), generously offered by freeCodeCamp itself.

Each step shall be hereafter discussed, but it is important to stress that the second point is dependant on the former. Without access to location it is not possible to retrieve relevant weather information and the webpage needs to account for such a possibillity (important cosideration for the design itself).

// TODO: solve the steps of the technical implementation list
// TODO: design the webpage considering the two steps

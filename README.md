# Local-Weather-App

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

For the background images found in the different mockups, and the background images ultimately referenced in the webpage, a reference to a images on [Pexels](https://www.pexels.com/) is made.


## Technical Implementation

As previously stated, the page needs to retrieve location and weather data through the HTML geolocation feature and the freeCodeCamp weather API.

1. [Get Location](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)



2. [Get Weather](https://fcc-weather-api.glitch.me/)

// TODO: describe technical implementation


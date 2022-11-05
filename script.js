// HOOKS to the DOM
var searchButtonEl = document.querySelector(".btn-primary")
var cityNameCurrentDateEl = document.querySelector("#cityNameCurrentDate")
var currentTempEl = document.querySelector("#currentTemp")
var currentWindEl = document.querySelector("#currentWind")
var currentHumidityEl = document.querySelector("#currentHumidity")

// state variables
// const variables


// GIVEN a weather dashboard with form inputs 
// WHEN I search for a city 
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// when search button is clicked, value from form input is used for API search parameter
searchButtonEl.addEventListener("click", searchCity) 
    
// if input is not a valid city then return?
// if input is a valid city then run fetch call?
// function searchCity() {
//     var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=Seattle&limit=1&appid=b8508be034c21d15df5123b4ba8affbc"

//     fetch(requestURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data[0].lat);
//         console.log(data[0].lon);
//     })
// }

function searchCity() {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat=47.6038321&lon=-122.330062&appid=b8508be034c21d15df5123b4ba8affbc"

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    
    })
}

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
    // use classes/id's to append this info on webpage?
    // WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
    // local storage?

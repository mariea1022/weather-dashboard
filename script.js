// HOOKS to the DOM
var searchButtonEl = document.querySelector(".btn-primary")
var cityInputEl = document.querySelector("#form-1")
var initialContentEl = document.querySelector(".initial-weather-content")
var weatherContainerEl = document.querySelector(".weather-container")
var cityNameCurrentDateEl = document.querySelector("#cityName")
var currentDateEl = document.querySelector("#currentDate")
var weatherIconEl = document.querySelector("#weatherIcon")
var currentTempEl = document.querySelector("#currentTemp")
var currentWindEl = document.querySelector("#currentWind")
var currentHumidityEl = document.querySelector("#currentHumidity")
var futureDateEl = document.querySelectorAll(".futureDate")
var futureTempEl = document.querySelectorAll(".futureTemp")
var futureWindEl = document.querySelectorAll(".futureWind")
var futureHumidityEl = document.querySelectorAll(".futureHumidity")
var futureWeatherIconEl = document.querySelectorAll(".futureWeatherIcon")
var searchHistoryBtnEl = document.querySelectorAll(".btn-secondary")

// state variables
// const variables


// GIVEN a weather dashboard with form inputs 
// WHEN I search for a city 
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// when search button is clicked, text from form input is used for API search parameter
searchButtonEl.addEventListener("click", searchCoords) 

function updateRecentCities() {
    var preExistingCities = localStorage.getItem("search")
        var arrCities = []
        if (preExistingCities) {
            arrCities = JSON.parse(preExistingCities)
        }
        for (var i = 0; i < 8; i++) {
            var cityName = arrCities[i]
            searchHistoryBtnEl[i].textContent = cityName
            if (searchButtonEl[i] = cityName) {
            searchHistoryBtnEl[i].style.display = "block"
        }
        }
    }

updateRecentCities()

// if input is not a valid city then return?
// if input is a valid city then run fetch call?
function searchCoords() {
    var city = cityInputEl.value
    // console.log(city)
    
    
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=b8508be034c21d15df5123b4ba8affbc"

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        var cityName = data[0].name

        var preExistingCities = localStorage.getItem("search")
        var arrCities = []

        // if local storage has data, store data in arrCities array
        if (preExistingCities) {
            // console.log(preExistingCities)
            arrCities = JSON.parse(preExistingCities)
        }
        // adds new element to beginning of array
        if (!arrCities.includes(cityName)) {
        arrCities.unshift(cityName)
        // console.log(arrCities)
        }
        var json = JSON.stringify(arrCities)
        localStorage.setItem("search", json)
        updateRecentCities()

        var cityCountry = data[0].country
        cityNameCurrentDateEl.textContent = cityName + ", " + cityCountry
        // console.log(data[0].lat);
        var latitude = data[0].lat
        // console.log(data[0].lon);
        var longitude = data[0].lon
        searchCity(latitude, longitude)
        searchCityForecast(latitude, longitude)

        initialContentEl.style.display = "none"
        weatherContainerEl.style.display = "block"
    })
}

function searchCity(latitude, longitude) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=b8508be034c21d15df5123b4ba8affbc&units=imperial"

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        // WHEN I view current weather conditions for that city
        // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
        var unixTimestamp = data.dt
        var milliseconds = unixTimestamp * 1000 
        var dateObject = new Date(milliseconds)
        var humanDateFormat = dateObject.toLocaleDateString() 
        console.log(humanDateFormat)
        console.log(currentDateEl.textContent = humanDateFormat)
        // currentDateEl.textContent = humanDateFormat
        // console.log(data.weather[0].icon)
        var weatherIcon = data.weather[0].icon
        var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        weatherIconEl.setAttribute("src", iconURL)
        var currentTemp = "Temp: " + data.main.temp + " \u00B0F"
        currentTempEl.textContent = currentTemp
        var currentWind = "Wind: " + data.wind.speed + " MPH"
        currentWindEl.textContent = currentWind
        var currentHumidity = "Humidity: " + data.main.humidity + "%"
        currentHumidityEl.textContent = currentHumidity
    })
}

  
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function searchCityForecast(latitude, longitude) {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=b8508be034c21d15df5123b4ba8affbc&units=imperial"

    fetch(requestURL)
    .then(function (response) {
    return response.json();
})
    .then(function (data) {
    console.log(data.list)
    for (var i = 0; i < 5 ; i++) {
    var unixTimestamp = data.list[(i*8)+7].dt
    var milliseconds = unixTimestamp * 1000 
    var dateObject = new Date(milliseconds)
    var humanDateFormat = dateObject.toLocaleDateString() 
    console.log(humanDateFormat)
    futureDateEl[i].textContent = humanDateFormat
    var futureWeatherIcon = data.list[(i*8)+7].weather[0].icon
    var futureIconURL = "http://openweathermap.org/img/wn/" + futureWeatherIcon + "@2x.png";
    futureWeatherIconEl[i].setAttribute("src", futureIconURL)
    var futureTemp = "Temp: " + data.list[(i*8)+7].main.temp + " \u00B0F"
    futureTempEl[i].textContent = futureTemp
    var futureWind = "Wind: " + data.list[(i*8)+7].wind.speed + " MPH"
    futureWindEl[i].textContent = futureWind
    console.log(data.list[(i*8)+7].main.humidity)
    var futureHumidity = "Humidity: " + data.list[(i*8)+7].main.humidity + "%"
    futureHumidityEl[i].textContent = futureHumidity
}

})
}

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
    // addEventListener to each button  
    // get the text via textContent via event.target
for (var i = 0; i < searchHistoryBtnEl.length; i++) {
searchHistoryBtnEl[i].addEventListener("click", function(event) {
    cityInputEl.value = event.target.textContent
    // console.log(cityInputEl)
    searchCoords()
})
}

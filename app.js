// Menu bar toggle event
document.getElementById("toggleButton").addEventListener("click", function() {
    var menus = document.getElementById("menus");
    if (menus.style.display === "none" || menus.style.display === "") {
        menus.style.display = "block"; 
        setTimeout(function() {
            menus.style.right = "0"; 
        }, 10); 
    } else {
        menus.style.right = "-220px"; 
        setTimeout(function() {
            menus.style.display = "none"; 
        }, 500);
    }
});

// Elements for search and weather data display
let btn = document.getElementById("search");
let temp = document.querySelector(".p1");
let pcondition = document.querySelector(".cloudy");
let splace = document.querySelector(".place");
let mintemp = document.querySelector(".p2");
let maxtemp = document.querySelector(".p3");
let windspeed = document.querySelector(".p4");
let address = document.querySelector(".address");
let day2 = document.querySelector(".day-2");
let day3 = document.querySelector(".day-3");
let day4 = document.querySelector(".day-4");
let day5 = document.querySelector(".day-5");
let day6 = document.querySelector(".day-6");
let day7 = document.querySelector(".day-7");
let weathericon = document.querySelector(".weather-icon");
let weathericon1 = document.querySelector(".weather-icon1");
let weathericon2 = document.querySelector(".weather-icon2");
let weathericon3 = document.querySelector(".weather-icon3");
let weathericon4 = document.querySelector(".weather-icon4");
let weathericon5 = document.querySelector(".weather-icon5");
let weathericon6 = document.querySelector(".weather-icon6");
let weathericon7 = document.querySelector(".weather-icon7");
let input = document.querySelector(".input");

// Event listeners for search button click and Enter key
btn.addEventListener("click", fetchWeatherData);
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        fetchWeatherData();
    }
});

// Fetch weather data function
async function fetchWeatherData() {
    let city = input.value;
    let base_url1 = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=FQKJ2Y5RU28UNCFR8G8QV8VF4&contentType=json`;
    let response = await fetch(base_url1);

    if (!response.ok) {
        alert("Unable to fetch the weather data. Please enter the correct city name.");
        return;
    }

    let data = await response.json();
    console.log(data);

    // Date to day conversion
    function getDayOfWeek(dateString) {
        const date = new Date(dateString);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[date.getDay()]; 
    }

    const days = [day2, day3, day4, day5, day6, day7];
    for (let i = 0; i < days.length; i++) {
        const datetime = data.days[i + 1].datetime;
        const dayOfWeek = getDayOfWeek(datetime);
        days[i].innerText = dayOfWeek;
    }

    // Place data in elements
    temp.innerText = data.days[0].temp;
    splace.innerText = city;
    pcondition.innerText = data.days[0].conditions;
    mintemp.innerText = `mintemp = ${data.days[0].tempmin}`;
    maxtemp.innerText = `maxtemp = ${data.days[0].tempmax}`;
    windspeed.innerText = `windspeed = ${data.days[0].windspeed}`;
    address.innerText = `${data.resolvedAddress}`;

    // Weekly data update
    for (let i = 0; i < 7; i++) {
        const dayTemp = document.getElementById(`temp${i + 1}`);
        const minTemp = document.getElementById(`mintemp${i + 1}`);
        const maxTemp = document.getElementById(`maxtemp${i + 1}`);
        const windDir = document.getElementById(`windtemp${i + 1}`);
        const windSpeed = document.getElementById(`windspeedtemp${i + 1}`);
        
        dayTemp.innerText = `${data.days[i].temp}`;
        minTemp.innerText = `min temp ${data.days[i].tempmin}`;
        maxTemp.innerText = `max temp ${data.days[i].tempmax}`;
        windDir.innerText = `wind dir ${data.days[i].winddir}`;
        windSpeed.innerText = `wind speed ${data.days[i].windspeed}`;
    }

    // Weather conditions
    document.querySelector(".conwinddir").innerText = `wind direction: ${data.days[0].winddir}`;
    document.querySelector(".conwindspeed").innerText = `wind speed: ${data.days[0].windspeed}`;
    document.querySelector(".conwindgust").innerText = `wind gust: ${data.days[0].windgust}`;
    document.querySelector(".sunrise").innerText = `sunrise : ${data.days[0].sunrise}`;
    document.querySelector(".sunset").innerText = `sunset : ${data.days[0].sunset}`;
    document.querySelector(".visibility").innerText = `Visibility : ${data.days[0].visibility}`;
    document.querySelector(".Dew").innerText = `dew : ${data.days[0].dew}`;
    document.querySelector(".Humidity").innerText = `humidity : ${data.days[0].humidity}`;
    document.querySelector(".clouds").innerText = `clouds : ${data.days[0].cloudcover}`;

    // Icon updates
    let enter0 = document.getElementById("enter0");
    if (data.days[0].conditions === "Rain") {
        weathericon.src = "rainy-removebg-preview.png";
        enter0.style.backgroundImage = "url('rain-4431_256.gif')";
    } else if (data.days[0].conditions === "Clear") {
        weathericon.src = "clear-removebg-preview.png";
        enter0.style.backgroundImage = "url('clearsky.jpg')";
    } else if (data.days[0].conditions === "Overcast") {
        weathericon.src = "windy-removebg-preview.png";
        enter0.style.backgroundImage = "url('storm-11970_256.gif')";
    } else if (data.days[0].conditions === "Partially cloudy") {
        weathericon.src = "cloud.png";
        enter0.style.backgroundImage = "url('sky-4583_256.gif')";
    } else if (data.days[0].conditions === "fog") {
        weathericon.src = "snowandfog-removebg-preview";
    }

    // Weekly icons
    const conditionToIcon = {
        "Rain": "rainy-removebg-preview.png",
        "Clear": "clear-removebg-preview.png",
        "Overcast": "windy-removebg-preview.png",
        "Partially cloudy": "cloud.png",
        "fog": "snowandfog-removebg-preview.png"
    };
    const weatherIcons = [weathericon1, weathericon2, weathericon3, weathericon4, weathericon5, weathericon6, weathericon7];
    for (let i = 0; i < data.days.length && i < weatherIcons.length; i++) {
        const condition = data.days[i].conditions;
        if (conditionToIcon[condition]) {
            weatherIcons[i].src = conditionToIcon[condition];
        }
    }
}

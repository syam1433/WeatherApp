//menu bar
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
        }, 500); n
    }
});
let btn=document.getElementById("search")
let temp=document.querySelector(".p1");
let pcondition=document.querySelector(".cloudy");
let splace=document.querySelector(".place");
let mintemp=document.querySelector(".p2");
let maxtemp=document.querySelector(".p3");
let windspeed=document.querySelector(".p4");
let address=document.querySelector(".address");
let day2=document.querySelector(".day-2");
let day3=document.querySelector(".day-3");
let day4=document.querySelector(".day-4");
let day5=document.querySelector(".day-5");
let day6=document.querySelector(".day-6");
let day7=document.querySelector(".day-7");
let weathericon=document.querySelector(".weather-icon");
btn.addEventListener("click", async ()=>{
    let city=document.querySelector(".input").value;
    let base_url1=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=FQKJ2Y5RU28UNCFR8G8QV8VF4&contentType=json`;
    let respone= await fetch(base_url1);
    if (!respone.ok){
        alert("unable fetch the weather data please enter the correct city name");
    }
    else{
    let data=await respone.json();
    console.log(data);
    //datetime to day converting
    function getDayOfWeek(dateString) {
        const date = new Date(dateString);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[date.getDay()]; 
    }
    const days = [day2, day3, day4, day5, day6, day7];
    for (let i = 0; i < days.length; i++) {
        const datetime = data.days[i + 1].datetime; // i+1 because data.days[0] is day 1
        const dayOfWeek = getDayOfWeek(datetime);
        days[i].innerText = dayOfWeek;
    }
    //placing the data
    temp.innerText=data.days[0].temp;
    splace.innerText=city;
    pcondition.innerText=data.currentConditions.conditions;
    mintemp.innerText=`mintemp = ${data.days[0].tempmin}`;
    maxtemp.innerText=`maxtemp = ${data.days[0].tempmax}`;
    windspeed.innerText=`windspeed = ${data.days[0].windspeed}`;
    address.innerText=`${data.resolvedAddress}`;
    //weekly
    // Loop through the data for each day and update the corresponding elements
    for (let i = 0; i < 7; i++) {
        // Create local variables within the loop for each day's elements
        const dayTemp = document.getElementById(`temp${i + 1}`);
        const minTemp = document.getElementById(`mintemp${i + 1}`);
        const maxTemp = document.getElementById(`maxtemp${i + 1}`);
        const windDir = document.getElementById(`windtemp${i + 1}`);
        const windSpeed = document.getElementById(`windspeedtemp${i + 1}`);
        // Update the HTML content using the data for the current day
        dayTemp.innerText = `${data.days[i].temp}`;
        minTemp.innerText = `min temp ${data.days[i].tempmin}`;
        maxTemp.innerText = `max temp ${data.days[i].tempmax}`;
        windDir.innerText = `wind dir ${data.days[i].winddir}`;
        windSpeed.innerText = `wind speed ${data.days[i].windspeed}`;
    }
    //conditions
    document.querySelector(".conwinddir").innerText=`wind direction: ${data.days[0].winddir}`;
    document.querySelector(".conwindspeed").innerText=`wind speed: ${data.days[0].windspeed}`;
    document.querySelector(".conwindgust").innerText=`wind gust: ${data.days[0].windgust}`;
    document.querySelector(".sunrise").innerText=`sunrise : ${data.days[0].sunrise}`;
    document.querySelector(".sunset").innerText=`sunset : ${data.days[0].sunset}`;
    document.querySelector(".visibility").innerText=`Visibility : ${data.days[0].visibility}`;
    document.querySelector(".Dew").innerText=`dew : ${data.days[0].dew}`;
    document.querySelector(".Humidity").innerText=`humidity : ${data.days[0].humidity}`;
    document.querySelector(".clouds").innerText=`clouds : ${data.days[0].cloudcover}`;
    //icons
    if(data.currentConditions.conditions=="rain"){
        weathericon.src="rainy-removebg-preview.png";
    }
    else if(data.currentConditions.conditions=="Clear"){
        weathericon.src="clear-removebg-preview.png";
    }
    else if(data.currentConditions.conditions=="Partially cloudy"){
        weathericon.src="cloud.png";
    }
    else if(data.currentConditions.conditions=="Rain, Partially cloudy"){
        weathericon.src="rainy-removebg-preview.png";
    }
    else if(data.currentConditions.conditions=="fog"){
        weathericon.src="snowandfog-removebg-preview";
    }
    }
});
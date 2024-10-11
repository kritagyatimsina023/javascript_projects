const apikey = "0f1541dc4766d62beca056c2f41b12db";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search_box = document.querySelector(".search input");
const search_btn = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather-icon");
let weather = document.querySelector(".weather");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        // document.querySelector(".weather").style.display = "none"
        weather.classList.add("weather");


    }
    else {
        var data = await response.json();               //this data will have all the info od city bangalore

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

        if (data.weather[0].main == "Cloudes") {
            weather_icon.src = "images/cloudes.png";
        }
        else if (data.weather[0].main == "Clear") {
            weather_icon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weather_icon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Snow") {
            weather_icon.src = "images/snow.png"
        }
        else if (data.weather[0].main == "Drizzel") {
            weather_icon.src = "images/drizzel.png"
        }
        else if (data.weather[0].main == "Mist") {
            weather_icon.src = "images/mist.png"
        }


        document.querySelector(".error").style.display = "none"
        // document.querySelector(".weather").style.display = "block"
        weather.classList.remove("weather");

    }


}

search_btn.addEventListener("click", () => {
    checkWeather(search_box.value);
});



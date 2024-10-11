let apikey = "0f1541dc4766d62beca056c2f41b12db";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let temp = document.querySelector(".temp");
let city = document.querySelector(".city");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let btn = document.querySelector(".search button");
let search_input = document.querySelector(".search input")
let weather = document.querySelector(".weather");
let error = document.querySelector(".error");



async function checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid = ${apikey}`);
    if (response.status == 404) {
        error.classList.add("error")
        weather.classList.add("weather")

    }
    else {
        var data = await response.json();

        temp.innerHTML = data.main.temp + "";
        city.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + "";
        wind.innerHTML = data.wind.speed + "km/hr";
        if (data.weather[0] == "Cloudes") {
            weather_icon.src = "image/"
        } weather.classList.add("weather");
    }



   

}
btn.addEventListener("click", () => {
    checkweather(search_input.value)
});


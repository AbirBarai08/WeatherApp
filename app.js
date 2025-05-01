const inp = document.querySelector("input");
const btn = document.querySelector("button");
const searchCity = document.querySelector("h1");
const temp = document.querySelector(".temparature");
const desc = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const feelsLike = document.querySelector(".feels-like");
const pressure = document.querySelector(".pressure");
const windSpeed = document.querySelector(".wind-speed");
const weatherIcon = document.querySelector(".curr-city-weather-icon img");

const BASE_URL = 'https://weather-api138.p.rapidapi.com/weather?city_name=kalyani';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '45c4bbcc04msh2ba9a0290067af5p194b28jsn89881949f844',
		'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
	}
};

inp.addEventListener("keypress" , (event) => {
    if(event.key === "Enter" && inp.value !== ""){
        searchWeather(inp.value);
    }
})

btn.addEventListener("click" , () => {
    if(inp.value !== ""){
        searchWeather(inp.value);
    }
})

async function searchWeather(city){
    inp.value = "";
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city.toLowerCase()}`;
    
    try{
        const response = await axios.get(url , options);
        console.log(response);

        if(response.data.cod === "404"){
            alert(`Weather of ${city} is not found...please try again`);
        }
        else{
            searchCity.innerText = response.data.name;
            temp.innerHTML = `Temparature : ${(response.data.main.temp - 270.15).toFixed(2)}<sup>o</sup>C`;
            desc.innerText = `Description : ${response.data.weather[0].description}`;
            humidity.innerText = `Humidity : ${response.data.main.humidity}`;
            feelsLike.innerHTML = `Feels Like : ${(response.data.main.feels_like - 270.15).toFixed(2)}<sup>o</sup>C`;
            pressure.innerText = `Pressure : ${response.data.main.pressure}`;
            windSpeed.innerText = `Wind Speed : ${response.data.wind.speed}`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        }
    }
    catch(err){
        console.log(err);
    }
}

function anotherCities() {
    const cities = document.querySelectorAll(".cities");
    for(let everyCity of cities){
        const anotherCity = everyCity.querySelector(".city");
        const anotherCityTemp = everyCity.querySelector(".another-city-temp");
        const anotherCityWeatherIcon = everyCity.querySelector(".weather-icon img");
        anotherCityWeather(anotherCity , anotherCityTemp , anotherCityWeatherIcon);
    }
}

async function anotherCityWeather(anotherCity , anotherCityTemp , anotherCityWeatherIcon) {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${anotherCity.innerText.toLowerCase()}`;

    try{
        const response = await axios.get(url , options);

        anotherCityTemp.innerHTML = ` ${(response.data.main.temp - 270.15).toFixed(2)}<sup>o</sup>C`;
        anotherCityWeatherIcon.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    }
    catch(err){
        console.log(err);
    }
}

async function kolkataWeather(){
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=kolkata`;
    try{
        const response = await axios.get(url , options);

        if(response.cod === "404"){
            alert(`Weather of ${city} is not found...please try again`);
        }
        else{
            searchCity.innerText = response.data.name;
            temp.innerHTML = `Temparature : ${(response.data.main.temp - 270.15).toFixed(2)}<sup>o</sup>C`;
            desc.innerText = `Description : ${response.data.weather[0].description}`;
            humidity.innerText = `Humidity : ${response.data.main.humidity}`;
            feelsLike.innerHTML = `Feels Like : ${(response.data.main.feels_like - 270.15).toFixed(2)}<sup>o</sup>C`;
            pressure.innerText = `Pressure : ${response.data.main.pressure}`;
            windSpeed.innerText = `Wind Speed : ${response.data.wind.speed}`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        }
    }
    catch(err){
        console.log(err);
    }
}

window.onload = () => {
    kolkataWeather();
    anotherCities();
}
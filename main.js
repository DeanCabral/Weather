const appVariables = {
    "apiKey": '',
}

document.querySelector('.search-button').addEventListener('click', searchWeather);
document.querySelector('.search-bar').addEventListener('keyup', keyPress);

function fetchWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appVariables.apiKey}`;
    fetch(url).then(res => res.json()).then(data => displayWeather(data));
}

function displayWeather(data) {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;

    document.body.style.backgroundImage = 'url('+`https://source.unsplash.com/1920x1080/?${name}+city+night`+')';


    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${Math.round(temp)}°C`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind Speed: ${speed}kmph`;
    
    document.getElementById('card').classList.add('animate-in');
}

function searchWeather() {
    let value = document.querySelector('.search-bar').value;
    document.getElementById('card').classList.remove('animate-in');
    fetchWeather(value);
}

function keyPress(event) {
    (event.key == 'Enter') && searchWeather();
}

function generateRandomCity() {
    const cities = ['London', 'New York', 'Tokyo', 'Sydney', 'California', 'Paris'];
    return cities[Math.floor(Math.random() * cities.length)];
}

fetchWeather('London')

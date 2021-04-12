const searchBtn = document.getElementById('searchBtn');

async function getWeather(location) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5ceec577fb0419c26263128c9858ed6f`, { mode: 'cors' })
    if (response.status === 404) {
        console.log(`Error: Location not found, please try again.`)
    } else {
        const weatherData = await response.json();
        console.log(processData(weatherData))
    }
}

function processData(data) {
    return {
        location: data.name,
        weather: data.weather[0],
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        tempHigh: data.main.temp_max,
        tempLow: data.main.temp_low,
        wind: data.wind
    }
}

searchBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    const input = document.getElementById('citySearch');
    getWeather(input.value);
})
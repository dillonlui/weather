async function getWeather(location) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5ceec577fb0419c26263128c9858ed6f`, { mode: 'cors' })
    if (response.status === 404) {
        console.log(`Error: Location not found, please try again.`)
    } else {
        const weatherData = await response.json();
        console.log(weatherData);
        const outputData = processData(weatherData);
        displayData(outputData);
    }
}

function processData(data) {
    return {
        location: data.name,
        weather: data.weather[0],
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        wind: data.wind,
        cloud: data.clouds.all,
        sunrise: convertTime(data.sys.sunrise),
        sunset: convertTime(data.sys.sunset)
    }
}
function convertTime(time) {
    const unixTime = time
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime;
}

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    const input = document.getElementById('citySearch');
    getWeather(input.value);
})

function displayData(data) {
    document.getElementById('city').innerText = data.location
    document.getElementById('condition').innerText = data.weather.description
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather.icon}@2x.png`
    document.getElementById('temp').innerText = data.temp
    document.getElementById('feelsLike').innerText = `Feels like: ${data.feelsLike}`
    document.getElementById('humidity').innerText = `Humidity: ${data.humidity}%`
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed}`
    document.getElementById('cloud').innerText = `Cloud Cover: ${data.cloud}%`
    document.getElementById('sunrise').innerText = `Sunrise: ${data.sunrise}`
    document.getElementById('sunset').innerText = `Sunset: ${data.sunset}`
}
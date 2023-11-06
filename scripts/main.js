

// Get location info using IPWho API
function getLocationInfo() {
    const apiIP = `https://ipwho.is/`

    fetch(apiIP)
        .then((response) => response.json())
        .then((data) => {
            const locationData = `${data.city}, ${data.region}, ${data.country}`;
            document.getElementById('location-data').textContent = locationData;
            getWeatherInfo(data.city);
        })
        .catch((error) => console.log('Error fetching location data: ', error));
}


// Get weather information using OpenWeather API
function getWeatherInfo(city) {
    // OpenWeather API Key  
    const apiKey = "62448efcf442b230c03987476fe4e980";

    const apiWeather = "https://api.openweathermap.org/data/2.5/weather/"
    const params = new URLSearchParams({
        q: city,
        units: 'metric',
        appid: apiKey,
    });

    fetch(`${apiWeather}?${params.toString()}`)
        .then((response) => response.json())
        .then((data) => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const weatherData = `Temperature: ${temperature}°C, Weather: ${description}`
            document.getElementById('weather-data').textContent = weatherData;
        })
        .catch((error) => console.log('Error fetching weather data: ', error));
}


// Display "Loading..." text
function showLoading() {
    document.getElementById('location-data').textContent = 'Loading...';
    document.getElementById('weather-data').textContent = 'Loading...';
}


// Fetch and display location and weather info
function fetchAndDisplayInfo() {
    // Show "Loading..." text
    showLoading(); 

    // Fetch and display location and weather info after a delay (2 seconds)
    setTimeout(() => {
        getLocationInfo();
        // getWeatherInfo();
    }, 2000);
}

// Event listener to the button
const fetchButton = document.getElementById('fetch-button');
fetchButton.addEventListener('click', fetchAndDisplayInfo);

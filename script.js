const getElement = (id) => document.querySelector(id);

const search = getElement("#search");
const city = getElement("#city");
const country = getElement("#city-name");
const humidityEl = getElement("#humidity");
const temperatureEl = getElement("#temperature");
const pressureEl = getElement("#see-level");

const fetchWeather = async () => {
    const cityName = city.value.trim();
    if (!cityName) return alert("Please enter a city");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=14161841f821571a53834d6f4f0c97d1&units=metric`);
        const data = await response.json();
        
        if (data.cod !== 200) return alert("City not found. Please enter a valid city name.");

        const { name, main: { humidity, temp, pressure } } = data;

        country.textContent = name;
        humidityEl.textContent = `Humidity: ${humidity}%`;
        temperatureEl.textContent = `Temperature: ${Math.round(temp)}°C`;
        pressureEl.textContent = `Atmospheric Pressure: ${pressure} hPa`;

        city.value = "";
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};


search.addEventListener("click", fetchWeather);
city.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchWeather();
    }
});

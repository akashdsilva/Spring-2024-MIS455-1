function connect() {
    var searchText = document.getElementById('search-input').value;
    fetchCountries(searchText);
}

function fetchCountries(countryName) {
    var url = 'https://restcountries.com/v3.1/name/' + countryName;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCountries(data))
}

function displayCountries(countries) {
    var container = document.getElementById('countries-container');
    container.innerHTML = '';
          
    countries.forEach(country => {
        var countryEl = document.createElement('div');
        countryEl.className = 'country-card';
        countryEl.innerHTML = `
            <h3>${country.name.common}</h3>
            <img src="${country.flags.svg}" alt="Flag" style="width: 100px;">
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Capital: ${country.capital}</p>
            <button onclick='fetchWeatherDetails(${country.latlng[0]}, ${country.latlng[1]}, "${country.name.common}"); this.disabled = true;'>More Details</button>`;
        container.appendChild(countryEl);
    });
}                                                                                

function fetchWeatherDetails(lat, lon, countryName) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f92afcbeb5cb22994bd5a42fba9ca18e&units=metric`;                 
    fetch(url)
    .then(res => res.json())
    .then(data => displayWeatherDetails(data, countryName))
}

function displayWeatherDetails(weatherData, countryName) {
    var container = document.getElementById('countries-container');
    var weather = weatherData.list[0];
    var weatherEl = document.createElement('div');
    weatherEl.className = 'weather-details';
    weatherEl.innerHTML = `
        <h4>Weather in ${countryName}</h4>
        <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Weather icon">
        <p>Description: ${weather.weather[0].description}</p>
        <p>Temperature: ${weather.main.temp} °C</p>
        <p>Wind Speed: ${weather.wind.speed} m/s</p>
        <p>Humidity: ${weather.main.humidity}%</p>
    `;
    container.appendChild(weatherEl);
}

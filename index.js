const apikey = "4cedfd87ad9a6ab286b438f7f86bf922";

const weatherDataEl = document.getElementById("weather-data")

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()

        console.log(data);

        const temperature_min = Math.round( data.main.temp_min)
        const temperature = Math.round( data.main.temp)
        const temperature_max = Math.round( data.main.temp_max)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round( data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ]


        weatherDataEl.querySelector(".icon").innerHTML = `<img
        src="http://openweathermap.org/img/wn/${icon}.png"
        alt="Weather Icon"
      />`;

      if(temperature > 25){
        weatherDataEl.querySelector(".temperature").style.background = "red";
      }else{
        weatherDataEl.querySelector(".temperature").style.background = "aqua";
      }

      weatherDataEl.querySelector(".temperature_min").textContent = 
      `${temperature_min}°C`;

      weatherDataEl.querySelector(".temperature").textContent = 
      `${temperature}°C`;

      weatherDataEl.querySelector(".temperature_max").textContent = 
      `${temperature_max}°C`;

      weatherDataEl.querySelector(".description").textContent = description

      weatherDataEl.querySelector(".details").innerHTML = 
      details.map((detail) => `<div>${detail}</div>`
      ).join("");


    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";

      weatherDataEl.querySelector(".temperature").textContent = 
      "";

      weatherDataEl.querySelector(".description").textContent = "An Error Happend , Please try Again Later";

      weatherDataEl.querySelector(".details").innerHTML = 
      "";

    }
}
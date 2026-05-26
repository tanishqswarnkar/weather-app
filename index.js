function createWeatherCard(data){

    let city = data.name;

    let temp = Math.round(data.main.temp);

    let humidity = data.main.humidity;

    let wind = data.wind.speed;

    let feels = Math.round(data.main.feels_like);

    let pressure = data.main.pressure;

    let weather = data.weather[0].main;

    let bgImage = "cloudy.jpg";


    // WEATHER BACKGROUND

    if(weather === "Rain" || weather === "Drizzle"){

        bgImage = "rainy.jpg";

    }

    else if(weather === "Clear"){

        bgImage = "sunny.jpg";

    }

    else if(
        weather === "Clouds" ||
        weather === "Haze" ||
        weather === "Mist" ||
        weather === "Smoke" ||
        weather === "Fog"
    ){

        bgImage = "cloudy.jpg";

    }



    return `

    <div class="weather-card"

        style="
            background-image:url('${bgImage}');
            background-size:cover;
            background-position:center;
            color:white;
            position:relative;
        "
    >

        <button class="delete-card" onclick="deleteCard(this)">
            ✕
        </button>

        <h1>${city}</h1>

        <h2>${temp}°C</h2>

        <p>${weather}</p>

        <div class="weather-info">

            <div>
                <h3>Humidity</h3>
                <p>${humidity}%</p>
            </div>

            <div>
                <h3>Wind</h3>
                <p>${wind} km/h</p>
            </div>

            <div>
                <h3>Feels Like</h3>
                <p>${feels}°C</p>
            </div>

            <div>
                <h3>Pressure</h3>
                <p>${pressure} hPa</p>
            </div>

        </div>

    </div>

    `;
}



async function searchWeather(){

    let city = document.getElementById("cityInput").value;

    if(city === ""){

        alert("Please enter city name");

        return;

    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f91258f11d409497ec8ac02f6d5f4d51&units=metric`;

    try{

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);


        // CITY NOT FOUND

        if(data.cod != 200){

            alert("City not found");

            return;

        }


        let card = createWeatherCard(data);


        // ASK SAVE

        let save = confirm("Do you want to save this weather card?");


        // SAVE CARD

        if(save){

            document.getElementById("weatherContainer").innerHTML += card;

        }


        // TEMP CARD

        else{

            let tempDiv = document.createElement("div");

            tempDiv.innerHTML = card;

            document.body.appendChild(tempDiv);

            setTimeout(()=>{

                tempDiv.remove();

            },3000);

        }

    }

    catch(error){

        console.log(error);

    }

}



// DELETE CARD

function deleteCard(button){

    let card = button.parentElement;

    card.remove();

}
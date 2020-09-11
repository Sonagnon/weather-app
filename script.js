const api = {
    key: "17f2c2ababeae4da7b676ab6e92c7180",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
        return weather.json();
    }).then(showResults);

}

function showResults(weather){
    console.log(weather); 

    let city = document.querySelector('.information-bloc .info-city-name');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    let date = document.querySelector('.information-bloc .info-date');
    date.innerText = dateBuilder(today);

    let temp = document.querySelector('.information-bloc .info-temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_quality = document.querySelector('.information-bloc .info-weather');
    weather_quality.innerText = weather.weather[0].main;

    let temp_borne = document.querySelector('.info-borne');

    temp_borne.innerText = `${Math.round(weather.main.temp_min)} °c | ${Math.round(weather.main.temp_max)} °c`;




}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septempber", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date =d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered!");
        console.log(registration); 
    }).catch(error =>{
        console.log("SW registration Failed!");
        console.log(error);
    })
}




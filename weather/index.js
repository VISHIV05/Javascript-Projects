const apikey ="aa84465a2bd3090f25023c4f66f345ce";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon= document.querySelector(".weather-icon");


async function getweather(city){
   const response = await fetch(apiUrl + city + `&appid=${apikey}`);
   
0  
if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}
else{
  
    var data = await response.json();
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText =Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + "km/h";
 
    if(data.weather[0].main== "clouds"){
     weatherIcon.src="cloud.png";
    }
 
    else if(data.weather[0].main== "Clear"){
     weatherIcon.src="clear.png";
    }
 
    else if(data.weather[0].main== "Rain"){
     weatherIcon.src="rainy.png";
    }
    else if(data.weather[0].main== "Drizzle"){
     weatherIcon.src="drizzle.png";
    }
    else if(data.weather[0].main== "Mist"){
     weatherIcon.src="mist.png";
    }
 
    document.querySelector(".weather" ).style.display = "block";
    document.querySelector(".error").style.display = "none";
    

}


  
//    console.log(data);
   



}
searchBtn.addEventListener("click",()=>{
    getweather(searchInput.value);
})

 getweather();
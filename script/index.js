

let key = "3c5aa36ccca0ca6192ab2330289777d4"
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

let container = document.getElementById("container")

let iframe = document.getElementById("gmap_canvas")
async function getWeatherData(){
  try{
    let city = document.getElementById("city").value; // accepting data


    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&exclude=daily`);

    let data = await res.json();

    let long = data.coord.lon.toFixed(2);
    let lat = data.coord.lat.toFixed(2);

    showWeather(data);
    forecastData(lat,long);
  }
    catch(err){
        console.log("err:",err);

    }
}


//for any city, i should be able to get its weather

//to show data
function showWeather(d){
console.log("d:",d);

container.innerHTML=null

let div1 = document.createElement('div')



let name = document.createElement("h1");
name.innerText ="Curent Weather";

let temp = document.createElement('h2')
temp.innerText=`${d.main.temp}°`;

let min_tem = document.createElement('p')
min_tem.innerHTML = `Min Temp: ${d.main.temp_min}°`

let max_tem = document.createElement('p')
max_tem.innerHTML = `Max Temp: ${d.main.temp_max}°`

let humidity = document.createElement('p')
humidity.innerText = `humidity: ${d.main.humidity}`

let pressure = document.createElement('p')
pressure.innerText =`Pressure: ${d.main.pressure}`;

let wind = document.createElement('p')
wind.innerText =`Wind speed: ${Math.round(d.wind.speed*3.1)}km/hr彡`;

let icon = document.createElement('img')
icon.src =`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`

let feels = document.createElement('p')
feels.innerText =`Feels Like: ${d.main.feels_like}°`;

let cloud = document.createElement('p')
cloud.innerText =`Cloud: ${d.weather[0].description}`;

div1.append(name,temp,feels,cloud,wind)


iframe.src=`https://maps.google.com/maps?q=${d.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

container.append(icon,div1,humidity,pressure,min_tem,max_tem)

if(d.weather[0].description=="haze" || d.weather[0].description=="mist" || d.weather[0].description=="overcast clouds" || d.weather[0].description=="broken clouds" || d.weather[0].description=="scattered clouds"){
  container.style.backgroundImage = "url(https://c.tenor.com/5ImWLS5QAJgAAAAC/foggy-fog.gif)"
}
else if(d.weather[0].description=="smoke"){
  container.style.backgroundImage = "url(https://thumbs.gfycat.com/AccomplishedMatureLemur-size_restricted.gif)"
}
else if(d.weather[0].description=="light rain"|| d.weather[0].description=="heavy rain" ||d.weather[0].description=="moderate rain"){
  container.style.backgroundImage = "url(https://media2.giphy.com/media/3oKIPstwMF15FghbYQ/giphy.gif)"
}
else{
  container.style.backgroundImage="url(https://i.pinimg.com/originals/75/16/ea/7516ea5454d6ebb256d2ecb34b66a95c.gif)"
}


}



//7 days

async function forecastData(lat,long) {
  try {
      let city = document.getElementById("city").value;

      let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${key}&units=metric`);

      let data = await res.json();
      console.log(data.daily);
      showForecast(data.daily);
  }
  catch(err) {
      console.log(err);
  }
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

let i = 0;

function showForecast(data) {

  document.getElementById("fore_days").innerText = "Weekly forecast"
  document.getElementById("forecast").innerHTML = "";
  i = 0;
  data.forEach(function(elem){
      today = (+dd + i++) + '-' + mm + '-' + yyyy;

      let clouds = elem.weather[0].main;

      let image = document.createElement("img");
      image.src =  `http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`

      let h4 = document.createElement("h4");
      h4.className = "date"

      if(i == 1) {
          h4.textContent = "Today";
      }
      else if(i == 2) {
          h4.textContent = "Tommorow"
      }
      else {
          h4.textContent = today;
      }
      console.log(i)

      let h3 = document.createElement("h3");
      h3.textContent = "7 Day Forecast";

      let max = document.createElement("h4");
      max.innerText = `${elem.temp.max.toFixed(0)}°`

      let min = document.createElement("h4");
      min.innerText = `${elem.temp.min.toFixed(0)}°`

      let div = document.createElement("div");
      div.className = "grid_div";
      div.append(max,min)
      let div2 = document.createElement("div")
      div2.append(image,div)
      let div3 = document.createElement("div");
      div3.append(h4,div2);

      document.getElementById("forecast").append(div3);
  })
}
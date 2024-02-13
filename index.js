var cityList =$("#city-list");
var cities = [];
var key = "fc8bffadcdca6a94d021c093eac22797";

function FormatDay(date){
    var date = new Date();
    console.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();
    
    var dayOutput = date.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    return dayOutput;
}

init();

function init(){
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cities = storedCities;
      }
    renderCities();
}

function storeCities(){
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
}

function renderCities() {
    cityList.empty();
    
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      
      var li = $("<li>").text(city);
      li.attr("id","listC");
      li.attr("data-city", city);
      li.attr("class", "list-group-item");
      console.log(li);
      cityList.prepend(li);
    }
    if (!city){
        return
    } 
    else{
        getResponseWeather(city)
    };
}   

$("#add-city").on("click", function(event){
  event.preventDefault();

var city = $("#city-input").val().trim();

if (city === "") {
    return;
}
cities.push(city);
storeCities();
renderCities();
});

function getResponseWeather(cityName){
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key; 

  $("#today-weather").empty();
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      
    cityTitle = $("<h3>").text(response.name + " "+ FormatDay());
    $("#today-weather").append(cityTitle);
    var TempetureToNum = parseInt((response.main.temp)* 9/5 - 459);
    var cityTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
    $("#today-weather").append(cityTemperature);
    var cityHumidity = $("<p>").text("Humidity: "+ response.main.humidity + " %");
    $("#today-weather").append(cityHumidity);
    var cityWindSpeed = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
    $("#today-weather").append(cityWindSpeed);
    var CoordLon = response.coord.lon;
    var CoordLat = response.coord.lat;
  })};
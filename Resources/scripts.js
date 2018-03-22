$(document).ready(function(){
var longitude, latitude;
var temp;
var desc;
var url = 'https://fcc-weather-api.glitch.me/';

var getWeatherData = function(long, lat){
  url+='api/current?lon='+long+'&lat='+lat;
  $.ajax({
    url: url,
    method: "GET",
    success: function(data){
      $('.location').text(data.name+", "+data.sys.country);
      temp = data.main.temp+" C";
      $('.weather').html(Math.trunc(data.main.temp)+" &#8451;");
      desc = data.weather[0].main.toString();
      $('.desc').text(data.weather[0].main);
      changeBackground(desc);
    }
  });
}

var changeToFarenheit = function(t){
  if(t.indexOf('C')>-1){
  temp = Math.trunc(Math.ceil(parseInt(t)*(9/5))+32);
  temp = temp.toString()+" &#8457;";
  $('.weather').html(temp);
  temp = temp +" F";
  return temp;
}
else{
  return temp;
}
}

var changeToCelsius = function(t){
  if(t.indexOf('F')>-1){
    temp = Math.trunc(Math.ceil(parseInt(t)-32)*(5/9));
    temp = temp.toString()+" &#8451;";
    $('.weather').html(temp);
    temp = temp +" C";
    return temp;
  }
  else{
    return temp;
  }
}

var changeBackground = function(descript){
  switch (descript) {
    case "Snow":
      $('.weatherApp').css('background-image','url(./Resources/snow.gif)');
      break;
    case "Clear":
      $('.weatherApp').css('background-image','url(./Resources/sun.gif)');
      break;
    case "Rain":
    $('.weatherApp').css('background-image','url(./Resources/rain.gif)');
      break;
    case "Thunderstorm":
    $('.weatherApp').css('background-image','url(./Resources/thunder.gif)');
      break;
    case "Cloudy":
      $('.weatherApp').css('background-image','url(./Resources/cloudy.gif)');
      break;
    case "Drizzle":
      $('.weatherApp').css('background-image','url(./Resources/rain.gif)');
      break;

  }
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      getWeatherData(longitude,latitude);
    });

}

$(".farenheit").on('click', function(e){
  e.preventDefault();
  changeToFarenheit(temp);
});

$(".celsius").on('click', function(e){
  e.preventDefault();
  changeToCelsius(temp);
});

});

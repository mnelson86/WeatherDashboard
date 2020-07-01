$(document).ready(function() {
  var searches = JSON.parse(localStorage.getItem("searches")) || [];
  
  $("#submitButton").on("click", function() {
    event.preventDefault();
    //var for getting value of input box
    var cityName = $("#cityName").val();
    
    //clearing input box
    //$("#cityName").val("");
    //run API call function
    getWeather(cityName);    
  })
//actual getWeather function
  function getWeather(cityName) {    
    //api call is made
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=4add603c6d72f3240c17a3fc3837ece3&units=imperial",
      method: "GET",
      success: function(response) {
        if (!searches.includes(response.name)) {
          searches.push(response.name);
      }
      localStorage.setItem("searches", JSON.stringify(searches));
      var title= $("<h3>").addClass("card-title").text(response.name + " (" + moment().format('L') + ")");
      var card = $("<div>").addClass("card");
      var wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + "mph");
      var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
      var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " degrees F");
      var cardBody = $("<div>").addClass("card-body");
      var cardImg = $("<img>").attr("src", "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png");

      title.append(cardImg);
      cardBody.append(title, temp, humidity, wind);
      card.append(cardBody);
      $("#resultsUpper").append(card);
      }
    }
        
  )}
  function forecast(cityName) {
    var cityName= $("#cityName").val();
    $.ajax ({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=4add603c6d72f3240c17a3fc3837ece3&units=imperial",
      method: "GET",
      success: function (response) {
        console.log(response)
        for (var i= 0; i < response.list.length; i+=8) {
          var date = response.list[i].dt_txt;

        console.log(date);
        
        var title = $("<h3>").addClass("card-title").text(date)
        var card = $("<div>").addClass("card");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp);
        var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity);
        var cardBody = $("<div>").addClass("card-body");
        var cardImg = $("<img>").attr("src", "https://api.openweathermap.org/img/w/" + data.list[i].weather[0].icon);
  
        title.append(cardImg);
        cardBody.append(title, temp, humidity);
        card.append(cardBody);
        $("#resultsLower").append(card);
      }

      }

    })
  }
  
  if (searches.length > 0) {
    getWeather(searches[searches.length-1]);
  }

  for (var i = 0; i < searches.length; i++) {
    addToHistory(searches[i]);
  }

})
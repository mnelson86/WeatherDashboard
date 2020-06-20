$(document).ready(function() {
  
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
      dataType: "json",
      success: function(response) {
        if (!inputLower.includes(cityName)) {
          inputLower.push(cityName);
          window.localStorage.setItem("history", JSON.stringify(history));
      }
      var title= $("<h3>").addClass("card-title").text(response.name + "(" +newDate().toLocalDateString() + ")");
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
      }})}
    


})
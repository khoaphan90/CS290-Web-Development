var appId = "&appid=862af7337b75920ab171547f82b04a2c";

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementById('locationSearch').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		var url = "http://api.openweathermap.org/data/2.5/weather?";
		var city = document.getElementById("citySearch").value;
		var zip = document.getElementById("zipSearch").value;
		if(zip === ''){
			formInput = "q=" + city;
		}
		else {
			formInput = "zip=" + zip;
		}
		var combinedInfo = url + formInput + appId + '&units=imperial';
		req.open("GET", combinedInfo, true);
		req.addEventListener('load', function() {
			if(req.status >= 200 && req.status < 400){
				var result = JSON.parse(req.responseText);
				getWeatherInfo(result);
			}
			else {
				var err = "Error in network request.";
				alert(err);
				console.log(err);
			}
		});
		req.send();
		event.preventDefault();
	});

	function getWeatherInfo(result){
		document.getElementById('city').textContent = result.name;
		document.getElementById('temp').textContent = result.main.temp;
		document.getElementById('forecast').textContent = result.weather[0].main;
		document.getElementById('humidity').textContent = result.main.humidity;
		document.getElementById('tempHigh').textContent = result.main.temp_max;
		document.getElementById('tempLow').textContent = result.main.temp_min;
		document.getElementById('windspeed').textContent = result.wind.speed;
		console.log(result);
	}
}
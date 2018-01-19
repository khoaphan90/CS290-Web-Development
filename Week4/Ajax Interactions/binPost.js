document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementById("userSubmit").addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		var url = "http://httpbin.org/post";
		var userInfo = {'name': null,
						'age': null,
						'weight': null};
		userInfo.name = document.getElementById("userName").value;
		userInfo.age = document.getElementById("userAge").value;
		userInfo.weight = document.getElementById("userWeight").value;
		req.open("POST", url, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if(req.status >= 200 && req.status < 400){
				var result = JSON.parse(JSON.parse(req.responseText).data);
				responseInfo(result);
			}
			else {
				var err = "Error in network request.";
				alert(err);
				console.log(err);
			}
		});
		req.send(JSON.stringify(userInfo));
		event.preventDefault();
	});
}

function responseInfo(result) {
	document.getElementById("returnName").textContent = result.name;
	document.getElementById('returnAge').textContent = result.age;
	document.getElementById('returnWeight').textContent = result.weight;
}
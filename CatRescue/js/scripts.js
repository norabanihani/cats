// all of your code goes in here
// it runs after the DOM is built

function ajax_get(url, callback) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			// console.log('responseText:' + xmlhttp.responseText);
			try {
				var data = JSON.parse(xmlhttp.responseText);
			} catch (err) {
				console.log(err.message + " in " + xmlhttp.responseText);
				return;
			}
			callback(data);
		}
	};

	xmlhttp.open("GET", url, true);
	xmlhttp.setRequestHeader("x-api-key",
			"3eec36cc-91fa-4e53-af8d-fec851b4e6ec");

	xmlhttp.send();
}

ajax_get(
		'https://api.thecatapi.com/v1/images/search?limit=24&page=100&order=Random',
		function(data) {
			// console.log(data);
			var images = [];
			var ids = [];
			data
					.forEach(function(entry) {
						// document.getElementById("url").innerHTML =
						// entry["url"];

						var html = '<div  class="container"><img style=""  id="img" class="image"  src='
								+ entry["url"]
								+ '>'
								+ '<div class="overlay"><div class="text" >'
								+ entry["id"] + '</div></div></div>';
						// var id = '<div class = "text" >' + entry["id"] +
						// '</div>';
						// document.getElementById("image").innerHTML = html;
						images.push(html);
						ids.push(html);
						console.log(ids.join(''));
						var div = ids.join('');

						// console.log(entry["id"]);
						// document.getElementById("id").innerHTML =id;

						document.getElementById("image").innerHTML = div;

						// console.log(data[i]["id"]);
						// image.innerHTML +=id;
						console.log(id);

						document.getElementById("image").onmouseover = function(
								e) {
							// console.log(e);

						}

					});

			//

		});

var myFormData = new FormData();

function onUploadBtnClick(e) {
	// ----- Cats
	var api_url = "https://api.thecatapi.com/v1/images/upload"
	var api_key = "DEMO-API-KEY"

	e.preventDefault();
	// get the inputted
	var file_input = document.getElementById("file")
	var sub_id_input = document.getElementById("sub_id")
	// var beerd = document.getElementById("beerd")

	// add them to the FormData object
	myFormData.append('file', file_input.files[0]);
	myFormData.append('sub_id', sub_id_input.value);
	// myFormData.append('beerd', beerd.value);
	// console.log(breed);

	var xmlhttp = new XMLHttpRequest;

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.status == 201) {
			updateResponseOutput("Success");

			var jsonResponse = JSON.parse(xmlhttp.response);
			var html1 = '<img style="    height: 20%;  width: 20%; " src="'
					+ jsonResponse["url"] + '" >';
			document.getElementById("image1").innerHTML = html1;
			var adobted = [];
			adobted.push(jsonResponse);
			console.log(adobted);

			xmlhttp.onload = function() {
				updateStatusOutput("Uploaded");
			};

		} else if (xmlhttp.status == 400) {
			updateResponseOutput("Error:You have to upload an animal image ");
		} else {
			var x = updateResponseOutput(xmlhttp.responseText);
			console.log("wedwed");

		}

	};

	xmlhttp.open('POST', api_url, true);

	// add your API key to the request header - this is needed to authorise an
	// upload
	xmlhttp.setRequestHeader('x-api-key',
			'3eec36cc-91fa-4e53-af8d-fec851b4e6ec'

	);
	xmlhttp.send(myFormData);
	console.log(myFormData);
	updateStatusOutput("Uploading...");
	var table = document.getElementById('results');
	var row = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');

	// td1.innerHTML = document.getElementById('sub_id').value;
	console.log(td1);
	row.appendChild(td1);
	document.getElementById('tableId').innerHTML = document
			.getElementById('sub_id').value;
	document.getElementById('tableAge').innerHTML = document
			.getElementById('age').value;
	document.getElementById('tableColor').innerHTML = document
			.getElementById('color').value;
	document.getElementById('tableBeerd').innerHTML = document
			.getElementById('beerd').value;

	// document.getElementById('tableImage').innerHTML= html1;

	table.children[0].appendChild(row);
}

function updateStatusOutput(msg) {
	// document.getElementById("status").innerHTML = msg;
	document.getElementById("status").innerHTML = msg;

}

function updateResponseOutput(msg) {
	document.getElementById("response").innerHTML = msg;

}

var form = document.getElementById("upload_form");
form.addEventListener("submit", onUploadBtnClick, true);

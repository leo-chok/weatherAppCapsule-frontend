fetch('https://weather-app-capsule-backend.vercel.app/weather')
	.then(response => response.json())
	.then(data => {
		if (data.weather) {
			for (let i = 0; i < data.weather.length; i++) {
				document.querySelector('#cityList').innerHTML += `
				<div class="cityContainer">
				<p class="name">${data.weather[i].cityName}</p>
				<p class="description">${data.weather[i].description}</p>
				<img class="weatherIcon" src="images/${data.weather[i].main}.png"/>
				<div class="temperature">
					<p class="tempMin">${Math.round(data.weather[i].tempMin)}°C</p>
					<span>-</span>
					<p class="tempMax">${Math.round(data.weather[i].tempMax)}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather[i].cityName}">Delete</button>
			</div>
			`;
			}
			updateDeleteCityEventListener();
		}
	});

function updateDeleteCityEventListener() {
	for (let i = 0; i < document.querySelectorAll('.deleteCity').length; i++) {
		document.querySelectorAll('.deleteCity')[i].addEventListener('click', function () {
			fetch(`https://weather-app-capsule-backend.vercel.app/weather/${this.id}`, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => {
					if (data.result) {
						this.parentNode.remove();
					}
				});
		});
	}
}

document.querySelector('#addCity').addEventListener('click', function () {
	const cityName = document.querySelector('#cityNameInput').value;

	fetch('https://weather-app-capsule-backend.vercel.app/weather', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cityName }),
	}).then(response => response.json())
		.then(data => {
			if (data.result) {
				document.querySelector('#cityList').innerHTML += `
			<div class="cityContainer">
				<p class="name">${data.weather.cityName}</p>
				<p class="description">${data.weather.description}</p>
				<img class="weatherIcon" src="images/${data.weather.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${Math.round(data.weather[i].tempMin)}°C</p>
					<span>-</span>
					<p class="tempMax">${Math.round(data.weather[i].tempMax)}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather.cityName}">Delete</button>
			</div>
					`;
				updateDeleteCityEventListener();
				document.querySelector('#cityNameInput').value = '';
			}

		});
});
document.addEventListener("DOMContentLoaded", async () => {
	const cardsContainer = document.querySelector(".cards");
	const searchInput = document.querySelector(".search-input");
	let missions = [];

	function createCard(mission) {
		const card = document.createElement("div");
		card.className = "card";

		card.innerHTML = `
			<img src="${mission.img}" alt="Image">
			<div class="overlay">
				<p class="name-title">${mission.name}</p>
				<p class="location-title">${mission.desc}</p>
				<div class="bottom-row">
					<a href="#" class="button1">Learn more</a>
					<div class="stars">★ ${mission.rating}</div>
				</div>
			</div>
		`;

		cardsContainer.appendChild(card);
	}

	async function loadMissions() {
		try {
			const res = await fetch("missions.json");
			missions = await res.json();
			renderMissions(missions);
		} catch (err) {
			console.error("Failed to load missions:", err);
		}
	}

	function renderMissions(data) {
		cardsContainer.innerHTML = "";
		data.forEach(createCard);
	}


	await loadMissions();
});
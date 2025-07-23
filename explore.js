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

		card.querySelector(".button1").addEventListener("click", (e) => {
			e.preventDefault();
			showPopup(mission);
		});

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

function showPopup(mission) {
	const overlay = document.getElementById("popup-overlay");
	overlay.querySelector("#popup-title").textContent = mission.name;
	overlay.querySelector("#popup-desc").textContent = mission.desc;
	overlay.querySelector("#popup-rating").textContent = `★ ${mission.rating}`;
	overlay.querySelector("#popup-duration").textContent = mission.duration;
	overlay.querySelector("#popup-dates").textContent = mission.flightDates;
	overlay.querySelector("#popup-price").textContent = mission.price;

	// Inclusions list
	const incList = overlay.querySelector("#popup-inclusions ul");
	incList.innerHTML = "";
	mission.inclusions.forEach(item => {
		const li = document.createElement("li");
		li.textContent = item;
		incList.appendChild(li);
	});

	// Equipment list
	const eqList = overlay.querySelector("#popup-equipment ul");
	eqList.innerHTML = "";
	mission.equipment.forEach(item => {
		const li = document.createElement("li");
		li.textContent = item;
		eqList.appendChild(li);
	});

	overlay.classList.remove("hidden");
}

// Close popup on ✕ click
document.querySelector(".close-popup").addEventListener("click", () => {
	document.getElementById("popup-overlay").classList.add("hidden");
});

// Close popup when clicking outside the popup-card
document.getElementById("popup-overlay").addEventListener("click", (e) => {
	if (e.target.id === "popup-overlay") {
		e.target.classList.add("hidden");
	}
});
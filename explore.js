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

	loadMissions();
});

// Show popup with dynamic mission details
function showPopup(mission) {
	const overlay = document.getElementById("popup-overlay");
	overlay.classList.remove("hidden");

	document.getElementById("popup-title").textContent = mission.name;
	document.getElementById("popup-desc").textContent = mission.desc;
	document.getElementById("popup-rating").textContent = `★ ${mission.rating}`;
	document.getElementById("popup-duration").textContent = mission.duration;
	document.getElementById("popup-dates").textContent = mission.flightDates;
	document.getElementById("popup-price").textContent = mission.price;
	document.getElementById("popup-best-for").textContent = mission["best-for"] || "Everyone";
	document.querySelector(".availability").innerHTML = `<i class="fa-solid fa-clock"></i> Only <strong>${mission.availability}</strong> seats left!`;

	// Promo banner
	document.querySelector(".promo-banner").innerHTML = mission["promo-banner"] || "";

	// Launch Date Options
	const launchSelect = document.getElementById("launch-date");
	launchSelect.innerHTML = "";
	(mission["launch-date-options"] || []).forEach(date => {
		const option = document.createElement("option");
		option.textContent = date;
		launchSelect.appendChild(option);
	});

	// Tags
	const tagsContainer = document.querySelector(".tags");
	tagsContainer.innerHTML = "";
	(mission.tags || []).forEach(tag => {
		const span = document.createElement("span");
		span.innerHTML = `<i class="${tag.includes('Kids') ? 'fa-solid fa-children' : 'fa-solid fa-user-astronaut'}"></i> ${tag}`;
		tagsContainer.appendChild(span);
	});

	// Inclusions
	const inclList = document.querySelector("#popup-inclusions ul");
	inclList.innerHTML = "";
	(mission.inclusions || []).forEach(item => {
		const li = document.createElement("li");
		li.textContent = item;
		inclList.appendChild(li);
	});

	// Equipment
	const equipList = document.querySelector("#popup-equipment ul");
	equipList.innerHTML = "";
	(mission.equipment || []).forEach(item => {
		const li = document.createElement("li");
		li.textContent = item;
		equipList.appendChild(li);
	});

	document.getElementById("book-mission-btn").onclick = () => {
		const token = localStorage.getItem("token");
		const user = JSON.parse(localStorage.getItem("user"));

		if (!token || !user) {
			window.location.href = "signin.html";
			return;
		}
		

		// Save selected mission temporarily to localStorage
		localStorage.setItem("pendingMission", JSON.stringify(mission));

		// Redirect to profile.html with popup flag
		window.location.href = "profile.html?bookMission=1";
	};
	document.getElementById("add-to-wishlist-btn").onclick = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        window.location.href = "signin.html";
        return;
    }

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    // Prevent duplicates
    const exists = wishlist.some(item => item.name === mission.name);
    if (exists) {
        alert("This mission is already in your wishlist.");
        return;
    }

    wishlist.push(mission);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
	window.location.href = "explore.html"
};


}

// Popup close behavior
document.querySelector(".close-popup").addEventListener("click", () => {
	document.getElementById("popup-overlay").classList.add("hidden");
});

document.getElementById("popup-overlay").addEventListener("click", (e) => {
	if (e.target.id === "popup-overlay") {
		e.target.classList.add("hidden");
	}
});

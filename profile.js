document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const showProfile = urlParams.get("showProfile");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const signinBtn = document.getElementById("signin-btn");
  

  if (token && user?.email && user?.name && user?.username) {
    if (signinBtn) {
      signinBtn.textContent = user.name;
      signinBtn.addEventListener("click", (e) => {
        e.preventDefault();
        profilePage();
      });
    }
  }

  if (
    token &&
    user?.email &&
    (!user?.name || !user?.username)
  ) {
    showProfilePopup();
  }
  if (urlParams.get("bookMission") === "1") {
    const mission = JSON.parse(localStorage.getItem("pendingMission"));
    console.log("Mission to book:", mission);
    if (mission) showBookingPopup(mission);
  }

});
function showBookingPopup(mission) {
	const popup = document.createElement("div");
	popup.id = "profile-popup";
	popup.innerHTML = `
		<div class="popup-content">
			<h2>Book: ${mission.name}</h2>
			<label>Passengers:</label>
			<input type="number" id="passenger-count" value="1" min="1" max="10">
			<label>Credit Card:</label>
			<input type="text" id="card-number" placeholder="1234 5678 9012 3456" />
			<button id="submit-booking">Confirm Booking</button>
		</div>
	`;
	document.body.appendChild(popup);

	document.getElementById("submit-booking").addEventListener("click", () => {
		const passengers = parseInt(document.getElementById("passenger-count").value);
		const card = document.getElementById("card-number").value.trim();

		if (!passengers || !card) return alert("Fill all fields.");

		mission.passengers = passengers;
		mission.card = "**** **** **** " + card.slice(-4);

		let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
		bookings.push(mission);
		localStorage.setItem("bookings", JSON.stringify(bookings));
		localStorage.removeItem("pendingMission");

		alert("Booking confirmed!");
		window.location.href = "profile.html";
	});
}

function refreshButton() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const signinBtn = document.getElementById("signin-btn");

  if (token && user?.email && user?.name && user?.username) {
    if (signinBtn) {
      signinBtn.textContent = user.name;
      signinBtn.addEventListener("click", (e) => {
        e.preventDefault();
        profilePage();
      });
    }
  }
}

function profilePage() {
  window.location.href = "profile.html";
}

function actualProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user.name.charAt(0).toUpperCase();

  const popup = document.createElement("div");
  popup.id = "profile-popup";
  popup.innerHTML = `
    <div class="actual-popup-content">
      <div class="actual-profile-header">
        <div class="actual-pfp-circle">${firstLetter}</div>
        <div class="actual-profile-text">
          <h2>${user.name}</h2>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
        </div>
      </div>
      <button id="signout-btn">Sign out</button>
    </div>
  `;
  document.body.appendChild(popup);

  popup.addEventListener("click", (e) => {
    if (!e.target.closest(".actual-popup-content")) {
      popup.remove();
    }
  });

  document.getElementById("signout-btn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "signin.html";
  });
}

function showProfilePopup() {
  const popup = document.createElement("div");
  popup.id = "profile-popup";
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Welcome!</h2>
      <p>Please complete your Orbital profile to continue</p>
      <input type="text" id="name" placeholder="Enter your name..." />
      <input type="text" id="username" placeholder="Choose a username..." />
      <button id="submit-profile">Continue</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("submit-profile").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();

    if (!name || !username) {
      alert("Please enter both fields.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user")) || {};
    user.name = name;
    user.username = username;

    localStorage.setItem("user", JSON.stringify(user));

    popup.remove();
    refreshButton();
  });
}

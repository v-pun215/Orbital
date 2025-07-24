document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return window.location.href = "signin.html";

  // Set user details
  document.querySelector(".actual-pfp-circle h2").textContent = user.name.charAt(0).toUpperCase();
  document.querySelector(".actual-pfp-text h2").textContent = user.name;
  document.querySelector(".actual-pfp-text p").textContent = user.email;

  // Tabs
  const missionsTab = document.querySelector(".missions");
  const wishlistTab = document.querySelector(".wishlist");
  const btnMissions = document.getElementById("edit-profile-btn");
  const btnWishlist = document.getElementById("logout-btn");

  btnMissions.addEventListener("click", () => {
    missionsTab.style.display = "flex";
    wishlistTab.style.display = "none";
    renderBookedMissions();
  });

    btnWishlist.addEventListener("click", () => {
    missionsTab.style.display = "none";
    wishlistTab.style.display = "flex";
    renderWishlist();
    });


  function renderBookedMissions() {
    const container = document.querySelector(".missions");
    container.innerHTML = "";

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    if (bookings.length === 0) {
      container.innerHTML = "<p style='color:white;'>No missions booked yet.</p>";
      return;
    }

    bookings.forEach(mission => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${mission.img}" alt="Mission Image">
        <div class="overlay">
          <p class="name-title">${mission.name}</p>
          <p class="location-title">${mission.desc}</p>
          <p>${mission.passengers} passenger(s)</p>
          <p><strong>Paid with:</strong> ${mission.card}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }

    function renderWishlist() {
    const wishlistContainer = document.querySelector(".wishlist");
    wishlistContainer.innerHTML = "";

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<p style='padding:30px;'>No wishlist items yet.</p>";
        return;
    }

    wishlist.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="overlay">
            <p class="name-title">${item.name}</p>
            <p class="location-title">${item.desc}</p>
            <div class="bottom-row">
            <p><strong>Rating:</strong> ★ ${item.rating}</p>
            <button class="remove-wishlist" data-index="${index}">Remove</button>
            </div>
        </div>
        `;
        wishlistContainer.appendChild(card);
    });

    document.querySelectorAll(".remove-wishlist").forEach(btn => {
        btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.index);
        const updated = JSON.parse(localStorage.getItem("wishlist") || "[]");
        updated.splice(i, 1);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        renderWishlist();
        });
    });
}


  // Logout
  const logoutBtn = document.getElementById("delete-account-btn");
  logoutBtn.addEventListener("click", () => {
    const confirmPopup = document.createElement("div");
    confirmPopup.className = "logout-confirm";
    confirmPopup.innerHTML = `
      <div class="logout-box">
        <p>Are you sure you want to log out?</p>
        <div class="logout-actions">
          <button id="cancel-logout">Cancel</button>
          <button id="confirm-logout">Yes, log out</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmPopup);

    document.getElementById("cancel-logout").addEventListener("click", () => {
      confirmPopup.remove();
    });

    document.getElementById("confirm-logout").addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  });

  // Default tab
  btnMissions.click();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signin-form");
  const passwordInput = document.querySelector(".password-input");
  const continueBtn = document.getElementById("continue-btn");

  let stage = 1;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (stage === 1) {
      // Reveal password input field
      passwordInput.removeAttribute("disabled");
      passwordInput.style.display = "block";
      passwordInput.focus();

      continueBtn.value = "Sign in";
      stage = 2;
      return;
    }

    const email = form.email.value.trim();
    const password = form.password.value;

    // Basic email format check
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail || password.length < 4) {
      alert("Please enter a valid email and password (min 4 characters).");
      return;
    }

    // Create a dummy user object
    const user = {
      email: email,
      password: password, // Only for demo; don't store plaintext passwords in production
      name: "",            // Will be set via profile popup
      username: ""
    };

    // Simulate token and store everything in localStorage
    const fakeToken = `dummy-token-${Date.now()}`;
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify(user));

    // Check for profile completion
    if (!user.name || !user.username) {
      window.location.href = "index.html?showProfile=1";
    } else {
      window.location.href = "index.html";
    }
  });
});

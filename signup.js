document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    // Basic validation
    if (!email || !password || !email.includes("@")) {
      alert("Please enter a valid email and password.");
      return;
    }

    // Simulate account creation
    const dummyToken = Math.random().toString(36).substring(2);
    const user = { email };

    localStorage.setItem("token", dummyToken);
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to profile setup
    window.location.href = "index.html?showProfile=1";
  });
});

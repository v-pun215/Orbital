window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".nav");
    if (window.scrollY > 50) {
        navbar.classList.add("translucent");
    } else {
        navbar.classList.remove("translucent");
    }
});

document.addEventListener("DOMContentLoaded", () => {
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (token && user) {
    console.log("User:", user);
    console.log("Token:", token);
} else {
    console.log("User not logged in.");
}
});
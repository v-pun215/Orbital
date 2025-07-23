window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".nav");
    if (window.scrollY > 50) {
        navbar.classList.add("translucent");
    } else {
        navbar.classList.remove("translucent");
    }
});
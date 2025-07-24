window.addEventListener('scroll', function() {
    const elem = document.getElementById('fadeinleft');
    if (!elem) return;

    const rect = elem.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView) {
        elem.classList.add('fadeinleft');
    }
});
window.addEventListener('scroll', function() {
    const elem = document.getElementById('fadeinright');
    if (!elem) return;

    const rect = elem.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView) {
        elem.classList.add('fadeinright');
    }
});
// Funktion, um das Karussell zu steuern
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

// Sanfte Übergänge für die Bilder
carouselItems.forEach(item => {
    item.style.transition = 'opacity 1s ease, transform 1s ease'; // Übergang hinzufügen
});

function showCarouselItem(index) {
    // Alle Bilder unsichtbar und aus dem Blickwinkel verschieben
    carouselItems.forEach((item, i) => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(100%) rotateY(90deg)';
    });

    // Aktuelles Bild sichtbar machen und es von links einfliegen lassen
    const currentItem = carouselItems[index];
    currentItem.style.opacity = 1;
    currentItem.style.transform = 'translateX(0) rotateY(0)';
}

// Start der Karussell-Animation
function startCarousel() {
    showCarouselItem(currentIndex);

    // Nächsten Index für das nächste Bild berechnen
    currentIndex = (currentIndex + 1) % carouselItems.length;

    // Bilder wechseln alle 4 Sekunden
    setTimeout(startCarousel, 4000);
}

// Initialisiere das Karussell
startCarousel();

// Pause der Animation bei Hover
carouselItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        clearTimeout(startCarousel); // Stoppt das Karussell
    });
    item.addEventListener('mouseleave', () => {
        startCarousel(); // Startet das Karussell erneut
    });
});

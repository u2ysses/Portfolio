document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. EFFETTO REVEAL ALLO SCROLL (Fade-in)
    // ==========================================
    const revealElements = document.querySelectorAll('.card, .info-grid, .contact-section');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Smette di osservare una volta visibile
            }
        });
    }, {
        threshold: 0.1, // Attiva l'effetto quando il 10% dell'elemento è visibile
        rootMargin: "0px 0px -50px 0px" // Anticipa leggermente l'effetto prima che arrivi a schermo
    });

    revealElements.forEach(element => {
        element.classList.add('reveal'); // Prepara gli elementi nascondendoli
        revealOnScroll.observe(element);
    });

    // ==========================================
    // 2. EFFETTO MICRO-INTERATTIVO SULLE CARDS (Tilt minimale)
    // ==========================================
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const image = card.querySelector('.card-image img');
        if (!image) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);

            // Muove leggermente l'immagine in direzione opposta al mouse (effetto profondità)
            image.style.transform = `scale(1.05) translate(${x * 0.03}px, ${y * 0.03}px)`;
        });

        card.addEventListener('mouseleave', () => {
            // Ripristina l'immagine in modo fluido quando il mouse esce
            image.style.transform = 'scale(1) translate(0px, 0px)';
        });
    });
});

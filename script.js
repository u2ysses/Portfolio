document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LOGO ASCII INTERATTIVO (Reagisce al Mouse)
    // ==========================================
    const asciiLogo = document.querySelector('.ascii-logo');
    
    if (asciiLogo) {
        const text = asciiLogo.textContent;
        asciiLogo.innerHTML = ''; // Svuota il logo per ricostruirlo carattere per carattere

        [...text].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            
            // Applichiamo l'interattività solo ai caratteri visibili (escludiamo spazi e ritorni a capo)
            if (char !== ' ' && char !== '\n') {
                span.classList.add('ascii-char');
                
                span.addEventListener('mouseover', () => {
                    // Genera uno spostamento e una rotazione casuale
                    const randomX = (Math.random() - 0.5) * 12; // Spostamento X
                    const randomY = (Math.random() - 0.5) * 12; // Spostamento Y
                    const randomRotate = (Math.random() - 0.5) * 45; // Rotazione in gradi
                    
                    span.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
                    span.style.color = '#ffffff'; // Il carattere si illumina di bianco
                });

                span.addEventListener('mouseleave', () => {
                    // Ritorna lentamente alla posizione originale
                    setTimeout(() => {
                        span.style.transform = 'translate(0px, 0px) rotate(0deg)';
                        span.style.color = ''; // Torna al grigio originale
                    }, 150);
                });
            } else {
                // Se è uno spazio o un a capo, lo tiene normale
                span.style.display = 'inline-block';
            }
            asciiLogo.appendChild(span);
        });
    }

    // ==========================================
    // 2. REVEAL ALLO SCROLL (Fade-in morbido)
    // ==========================================
    const revealElements = document.querySelectorAll('.card, .info-grid, .contact-section');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
    });

    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealOnScroll.observe(element);
    });

    // ==========================================
    // 3. EFFETTO TILT SULLE CARDS
    // ==========================================
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const image = card.querySelector('.card-image img');
        if (!image) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);

            image.style.transform = `scale(1.05) translate(${x * 0.03}px, ${y * 0.03}px)`;
        });

        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1) translate(0px, 0px)';
        });
    });
});

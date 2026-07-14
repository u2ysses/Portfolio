window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed'));
        
        const yPos = -(scrolled * speed / 10);
        el.style.transform = `translateY(${yPos}px)`;
    });
});


const cards = document.querySelectorAll('[data-tilt]');

cards.forEach(card => {
    const inner = card.querySelector('.card-inner');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
       
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
      
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const angleX = (yc - y) / 15;
        const angleY = -(xc - x) / 15;
        
     
        inner.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

   
    card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});

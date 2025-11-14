// =========================================
// EDICION.JS - JavaScript para edicion-2025.html
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== GALERÍA CON LIGHTBOX ====================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                openLightbox(imgSrc, imgAlt);
            });
        });
    }
    
    function openLightbox(imgSrc, imgAlt) {
        // Crear overlay de lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
                <img src="${imgSrc}" alt="${imgAlt}">
                <div class="lightbox-caption">${imgAlt}</div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Animar entrada
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        // Cerrar al hacer clic en el botón o fondo
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Cerrar con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }
    
    function closeLightbox() {
        const lightbox = document.querySelector('.lightbox-overlay');
        if (lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // ==================== ANIMACIÓN DE ESTADÍSTICAS ====================
    const statNumbers = document.querySelectorAll('.stat-number, .stat-number-large');
    
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent.replace(/\D/g, ''));
                const suffix = target.textContent.replace(/\d/g, '').trim();
                
                let current = 0;
                const increment = finalValue / 50;
                const duration = 1500;
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        target.textContent = finalValue + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, stepTime);
                
                observer.unobserve(target);
            }
        });
    };
    
    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // ==================== EXPANDIR/COLAPSAR METODOLOGÍA ====================
    const methodologyPhases = document.querySelectorAll('.methodology-phase');
    
    if (methodologyPhases.length > 0) {
        methodologyPhases.forEach(phase => {
            phase.addEventListener('click', function() {
                // Si ya está expandida, colapsar
                if (this.classList.contains('expanded')) {
                    this.classList.remove('expanded');
                } else {
                    // Colapsar todas
                    methodologyPhases.forEach(p => p.classList.remove('expanded'));
                    // Expandir la clickeada
                    this.classList.add('expanded');
                }
            });
        });
    }
    
    // ==================== VIDEO MODAL (si hay videos) ====================
    const videoTriggers = document.querySelectorAll('[data-video-id]');
    
    if (videoTriggers.length > 0) {
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const videoId = this.dataset.videoId;
                openVideoModal(videoId);
            });
        });
    }
    
    function openVideoModal(videoId) {
        const modal = document.createElement('div');
        modal.className = 'video-modal-overlay';
        modal.innerHTML = `
            <div class="video-modal-content">
                <button class="video-modal-close" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
                <div class="video-wrapper">
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        const closeBtn = modal.querySelector('.video-modal-close');
        closeBtn.addEventListener('click', closeVideoModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }
    
    function closeVideoModal() {
        const modal = document.querySelector('.video-modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // ==================== TESTIMONIOS SLIDER (opcional) ====================
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    
    if (testimonialsGrid && window.innerWidth < 768) {
        // En móvil, convertir en slider táctil
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialsGrid.style.display = 'flex';
        testimonialsGrid.style.overflowX = 'scroll';
        testimonialsGrid.style.scrollSnapType = 'x mandatory';
        testimonialsGrid.style.cursor = 'grab';
        
        const testimonials = testimonialsGrid.querySelectorAll('.testimonial-card');
        testimonials.forEach(card => {
            card.style.scrollSnapAlign = 'start';
            card.style.minWidth = '280px';
        });
    }
    
});

// ==================== ESTILOS ADICIONALES PARA LIGHTBOX Y VIDEO MODAL ====================
const style = document.createElement('style');
style.textContent = `
    /* Lightbox Overlay */
    .lightbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-overlay.active {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 85vh;
        border-radius: 8px;
        box-shadow: 0 10px 50px rgba(0,0,0,0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.25rem;
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .lightbox-close:hover {
        background: #f0f0f0;
        transform: rotate(90deg);
    }
    
    .lightbox-caption {
        color: white;
        text-align: center;
        margin-top: 1rem;
        font-size: 0.95rem;
    }
    
    /* Video Modal */
    .video-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .video-modal-overlay.active {
        opacity: 1;
    }
    
    .video-modal-content {
        position: relative;
        width: 90%;
        max-width: 1200px;
    }
    
    .video-wrapper {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 12px;
    }
    
    .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .video-modal-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.25rem;
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .video-modal-close:hover {
        background: #f0f0f0;
        transform: rotate(90deg);
    }
    
    /* Metodología expandida */
    .methodology-phase {
        cursor: pointer;
    }
    
    .methodology-phase.expanded {
        transform: scale(1.02);
        z-index: 10;
    }
    
    @media (max-width: 768px) {
        .lightbox-content img {
            max-height: 70vh;
        }
        
        .lightbox-close,
        .video-modal-close {
            top: -40px;
            width: 35px;
            height: 35px;
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(style);
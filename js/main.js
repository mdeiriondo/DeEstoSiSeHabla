// ==========================================
// DE ESTO SÍ SE HABLA - MAIN JAVASCRIPT
// ==========================================

'use strict';

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initNavigation();
    initHeroAnimations();
    initScrollEffects();
    initAOS();
    initSwiper();
    initTimeline();
    initForms();
    initCounters();
    initBackToTop();
    initParticles();
    initVideoControls();
    
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Active navigation on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ==================== HERO ANIMATIONS ====================
function initHeroAnimations() {
    // Add entrance animation to hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroCta) {
        setTimeout(() => {
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 900);
    }
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.blob, .shape');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==================== AOS INITIALIZATION ====================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

// ==================== SWIPER INITIALIZATION ====================
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        // Video Carousel
        const videoCarousel = new Swiper('.videoCarousel', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        });
    }
}

// ==================== TIMELINE EXPAND ====================
function initTimeline() {
    window.toggleTimeline = function(button) {
        const card = button.closest('.timeline-card');
        const expanded = card.querySelector('.timeline-expanded');
        const icon = button.querySelector('i');
        const text = button.querySelector('span');
        
        if (expanded.classList.contains('show')) {
            expanded.classList.remove('show');
            icon.classList.remove('fa-minus-circle');
            icon.classList.add('fa-plus-circle');
            text.textContent = 'Ver más información';
        } else {
            expanded.classList.add('show');
            icon.classList.remove('fa-plus-circle');
            icon.classList.add('fa-minus-circle');
            text.textContent = 'Ver menos';
        }
    };
}

// ==================== FORMS ====================
function initForms() {
    // Vote Form
    const voteForm = document.getElementById('voteForm');
    const otroRadio = document.getElementById('tema4');
    const otroInputWrapper = document.getElementById('otroInputWrapper');
    
    // Show/hide "Otro" input
    if (otroRadio && otroInputWrapper) {
        document.querySelectorAll('input[name="tema"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.id === 'tema4' && this.checked) {
                    otroInputWrapper.style.display = 'block';
                } else {
                    otroInputWrapper.style.display = 'none';
                }
            });
        });
    }
    
    // Vote form submission
    if (voteForm) {
        voteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(voteForm);
            const data = Object.fromEntries(formData);
            
            // Validate
            if (!data.tema) {
                alert('Por favor, seleccioná un tema');
                return;
            }
            
            if (!data.email) {
                alert('Por favor, ingresá tu email');
                return;
            }
            
            // Simulate submission (replace with actual API call)
            console.log('Vote data:', data);
            
            // Show success message
            const successMsg = document.getElementById('voteSuccess');
            if (successMsg) {
                voteForm.style.display = 'none';
                successMsg.style.display = 'block';
            }
            
            // In production, send data to backend:
            // fetch('/api/vote', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle success
            // })
            // .catch(error => {
            //     // Handle error
            // });
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const mensajeTextarea = document.getElementById('mensaje');
    const charCount = document.getElementById('charCount');
    
    // Character counter
    if (mensajeTextarea && charCount) {
        mensajeTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                charCount.style.color = '#ef476f';
            } else {
                charCount.style.color = '#a3a5a2';
            }
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate
            if (!data.nombre || !data.email || !data.mensaje) {
                alert('Por favor, completá todos los campos obligatorios');
                return;
            }
            
            if (data.mensaje.length > 500) {
                alert('El mensaje no puede superar los 500 caracteres');
                return;
            }
            
            // Simulate submission
            console.log('Contact data:', data);
            
            // Show success message
            const successMsg = document.getElementById('contactSuccess');
            if (successMsg) {
                contactForm.reset();
                successMsg.style.display = 'block';
                charCount.textContent = '0';
                
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }
        });
    }
}

// ==================== ANIMATED COUNTERS ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    let animated = false;
    
    const animateCounters = () => {
        if (animated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / speed;
            let count = 0;
            
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = Math.ceil(count);
                    setTimeout(updateCount, 1);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCount();
        });
        
        animated = true;
    };
    
    // Trigger animation when stats section is in view
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==================== PARTICLES.JS ====================
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// ==================== VIDEO CONTROLS ====================
function initVideoControls() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        const playOverlay = card.querySelector('.play-overlay');
        
        if (video && playOverlay) {
            playOverlay.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    playOverlay.style.opacity = '0';
                } else {
                    video.pause();
                    playOverlay.style.opacity = '1';
                }
            });
            
            video.addEventListener('ended', function() {
                playOverlay.style.opacity = '1';
            });
        }
    });
}

// ==================== UTILITY FUNCTIONS ====================

// Debounce function
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c✨ De esto SÍ se habla ✨', 'color: #552d77; font-size: 24px; font-weight: bold;');
console.log('%cPrograma de Salud Mental Adolescente', 'color: #296aa1; font-size: 14px;');
console.log('%cConcejo Municipal de Santa Fe', 'color: #a3a5a2; font-size: 12px;');
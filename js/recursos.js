// =========================================
// RECURSOS.JS - JavaScript para recursos.html
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== FILTROS DE CENTROS DE SALUD ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const healthCenters = document.querySelectorAll('.health-center-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Actualizar botones activos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar tarjetas
                healthCenters.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        
                        // Animar entrada
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ==================== COPIAR NÚMERO DE EMERGENCIA ====================
    const helplineNumbers = document.querySelectorAll('.helpline-number');
    
    helplineNumbers.forEach(number => {
        number.style.cursor = 'pointer';
        number.title = 'Click para copiar';
        
        number.addEventListener('click', function() {
            const text = this.textContent.trim();
            copyToClipboard(text);
            
            // Mostrar feedback visual
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            this.style.color = '#27ae60';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
            }, 2000);
        });
    });
    
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback para navegadores antiguos
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }
    
    // ==================== BUSCAR CENTROS DE SALUD ====================
    const searchInput = createSearchBar();
    
    function createSearchBar() {
        const filtersSection = document.querySelector('.filters');
        if (!filtersSection) return null;
        
        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'search-wrapper';
        searchWrapper.innerHTML = `
            <div class="search-input-wrapper">
                <i class="fas fa-search"></i>
                <input 
                    type="text" 
                    id="centerSearch" 
                    placeholder="Buscar por nombre, dirección o servicio..."
                    class="search-input"
                >
                <button id="clearSearch" class="clear-search" style="display: none;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        filtersSection.parentNode.insertBefore(searchWrapper, filtersSection);
        
        const input = document.getElementById('centerSearch');
        const clearBtn = document.getElementById('clearSearch');
        
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Mostrar/ocultar botón de limpiar
            clearBtn.style.display = searchTerm ? 'block' : 'none';
            
            // Filtrar centros
            healthCenters.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const matches = cardText.includes(searchTerm);
                
                card.style.display = matches ? 'block' : 'none';
                
                if (matches && searchTerm) {
                    // Highlight del término buscado
                    highlightText(card, searchTerm);
                }
            });
            
            // Mensaje si no hay resultados
            showNoResultsMessage();
        });
        
        clearBtn.addEventListener('click', function() {
            input.value = '';
            input.dispatchEvent(new Event('input'));
            input.focus();
        });
        
        return input;
    }
    
    function highlightText(element, term) {
        // Función simple de highlight (mejorar en producción)
        // En producción, usar una librería como mark.js
    }
    
    function showNoResultsMessage() {
        const visibleCenters = Array.from(healthCenters).filter(card => 
            card.style.display !== 'none'
        );
        
        let noResultsMsg = document.querySelector('.no-results-message');
        
        if (visibleCenters.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>No se encontraron centros con ese criterio.</p>
                `;
                document.querySelector('.health-centers-grid').appendChild(noResultsMsg);
            }
            noResultsMsg.style.display = 'flex';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
    
    // ==================== TOOLTIP PARA SERVICIOS ====================
    const serviceTags = document.querySelectorAll('.service-tag');
    
    serviceTags.forEach(tag => {
        tag.addEventListener('mouseenter', function(e) {
            const text = this.textContent.trim();
            const tooltip = createTooltip(text, e);
            document.body.appendChild(tooltip);
            
            // Posicionar tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
            
            setTimeout(() => tooltip.classList.add('visible'), 10);
        });
        
        tag.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.service-tooltip');
            if (tooltip) {
                tooltip.classList.remove('visible');
                setTimeout(() => tooltip.remove(), 200);
            }
        });
    });
    
    function createTooltip(text, e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'service-tooltip';
        
        // Definir descripciones de servicios
        const descriptions = {
            'Consultas externas': 'Atención programada con turnos',
            'Urgencias': 'Atención inmediata 24/7',
            'Internación': 'Posibilidad de internación',
            'Psiquiatría': 'Atención con médico psiquiatra',
            'Psicología': 'Atención con psicólogo/a',
            'Trabajo social': 'Orientación y acompañamiento social',
            'Talleres grupales': 'Actividades terapéuticas grupales'
        };
        
        tooltip.textContent = descriptions[text] || text;
        return tooltip;
    }
    
    // ==================== COMPARTIR RECURSOS ====================
    const shareButtons = createShareButtons();
    
    function createShareButtons() {
        const materialCards = document.querySelectorAll('.material-card');
        
        materialCards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
            shareBtn.title = 'Compartir';
            
            shareBtn.addEventListener('click', function(e) {
                e.preventDefault();
                shareResource(title);
            });
            
            card.style.position = 'relative';
            card.appendChild(shareBtn);
        });
    }
    
    function shareResource(title) {
        const url = window.location.href;
        const text = `${title} - De esto SÍ se habla`;
        
        if (navigator.share) {
            // API nativa de compartir (móviles)
            navigator.share({
                title: text,
                url: url
            }).catch(err => console.log('Error al compartir:', err));
        } else {
            // Fallback: copiar enlace
            copyToClipboard(url);
            alert('Enlace copiado al portapapeles');
        }
    }
    
    // ==================== IMPRIMIR PROTOCOLO DE CRISIS ====================
    const printProtocolBtn = createPrintButton();
    
    function createPrintButton() {
        const protocolSection = document.querySelector('.section-crisis-protocol');
        if (!protocolSection) return null;
        
        const printBtn = document.createElement('button');
        printBtn.className = 'btn btn-outline-primary print-protocol-btn';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Imprimir protocolo';
        
        const sectionHeader = protocolSection.querySelector('.section-header');
        sectionHeader.appendChild(printBtn);
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        return printBtn;
    }
    
    // ==================== MAPA INTERACTIVO (opcional) ====================
    // Si decides agregar un mapa de Google Maps o Leaflet:
    /*
    function initMap() {
        const centers = [
            { name: 'Hospital Agudo Ávila', lat: -31.6389, lng: -60.7050 },
            { name: 'Hospital Cullen', lat: -31.6237, lng: -60.6964 },
            // ... más centros
        ];
        
        // Inicializar mapa con Leaflet o Google Maps
        // Ver documentación de la librería elegida
    }
    */
    
    // ==================== ANIMACIÓN DE APARICIÓN ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    document.querySelectorAll('.helpline-card, .health-center-card, .digital-resource-card, .material-card').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
    
    // ==================== ESTADÍSTICAS DE USO ====================
    // Trackear qué recursos son más consultados
    const trackResourceClick = (resourceType, resourceName) => {
        // En producción, enviar a Google Analytics o sistema propio
        console.log('Recurso consultado:', resourceType, resourceName);
        
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', 'recurso_consultado', {
                'event_category': resourceType,
                'event_label': resourceName
            });
        }
        */
    };
    
    // Trackear clics en líneas de ayuda
    document.querySelectorAll('.helpline-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cardTitle = this.closest('.helpline-card').querySelector('h3').textContent;
            trackResourceClick('linea_ayuda', cardTitle);
        });
    });
    
    // Trackear descargas
    document.querySelectorAll('.material-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const materialTitle = this.closest('.material-card').querySelector('h3').textContent;
            trackResourceClick('descarga_material', materialTitle);
        });
    });
    
});

// ==================== ESTILOS ADICIONALES ====================
const style = document.createElement('style');
style.textContent = `
    /* Search Bar */
    .search-wrapper {
        margin-bottom: 2rem;
        animation: fadeInDown 0.5s ease;
    }
    
    .search-input-wrapper {
        position: relative;
        max-width: 600px;
        margin: 0 auto;
    }
    
    .search-input-wrapper i {
        position: absolute;
        left: 1.25rem;
        top: 50%;
        transform: translateY(-50%);
        color: #95a5a6;
        font-size: 1.125rem;
    }
    
    .search-input {
        width: 100%;
        padding: 1rem 3.5rem 1rem 3rem;
        border: 2px solid #e0e6ed;
        border-radius: 50px;
        font-size: 1rem;
        font-family: var(--font-secondary);
        transition: all 0.3s ease;
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
    }
    
    .clear-search {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        color: #95a5a6;
        font-size: 1.125rem;
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .clear-search:hover {
        background: #f0f0f0;
        color: #333;
    }
    
    /* No Results Message */
    .no-results-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: #95a5a6;
        display: none;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    .no-results-message i {
        font-size: 3rem;
        opacity: 0.5;
    }
    
    .no-results-message p {
        font-size: 1.125rem;
        margin: 0;
    }
    
    /* Service Tooltip */
    .service-tooltip {
        position: fixed;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
        white-space: nowrap;
    }
    
    .service-tooltip.visible {
        opacity: 1;
    }
    
    .service-tooltip::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid rgba(0,0,0,0.9);
    }
    
    /* Share Button */
    .share-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        background: white;
        border: 2px solid var(--border-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--text-dark);
    }
    
    .share-btn:hover {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
        transform: scale(1.1);
    }
    
    /* Print Button */
    .print-protocol-btn {
        margin-top: 1rem;
    }
    
    @media print {
        /* Ocultar elementos innecesarios al imprimir */
        header, footer, .filters, .print-protocol-btn, .share-btn {
            display: none !important;
        }
        
        .section-crisis-protocol {
            page-break-inside: avoid;
        }
        
        .protocol-step {
            page-break-inside: avoid;
            margin-bottom: 1rem;
        }
    }
    
    /* Animación fade-in */
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        .search-input {
            padding: 0.875rem 3rem 0.875rem 2.75rem;
            font-size: 0.95rem;
        }
        
        .search-input-wrapper i {
            left: 1rem;
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(style);
// =========================================
// PARTICIPAR.JS - JavaScript para quiero-participar.html
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== CONTADOR DE CARACTERES ====================
    const textareas = document.querySelectorAll('textarea[maxlength]');
    
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        const counterId = textarea.id + 'Count';
        const counter = document.getElementById(counterId);
        
        if (counter) {
            textarea.addEventListener('input', function() {
                const currentLength = this.value.length;
                counter.textContent = currentLength;
                
                // Cambiar color cuando se acerca al límite
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = '#e74c3c';
                } else if (currentLength > maxLength * 0.75) {
                    counter.style.color = '#f39c12';
                } else {
                    counter.style.color = '#95a5a6';
                }
            });
        }
    });
    
    // ==================== FAQ ACCORDION ====================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Cerrar todos los items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir el clickeado si no estaba activo
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // ==================== VALIDACIÓN Y ENVÍO DEL FORMULARIO ====================
    const inscriptionForm = document.getElementById('inscriptionForm');
    const successMessage = document.getElementById('inscriptionSuccess');
    
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            if (!validateForm(this)) {
                return false;
            }
            
            // Mostrar loading en el botón
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Simular envío (en producción, aquí iría la llamada AJAX real)
            setTimeout(() => {
                // Ocultar formulario
                inscriptionForm.style.display = 'none';
                
                // Mostrar mensaje de éxito
                successMessage.style.display = 'block';
                
                // Scroll al mensaje
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // En producción, aquí enviarías los datos:
                /*
                const formData = new FormData(inscriptionForm);
                
                fetch('/api/inscripcion', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        inscriptionForm.style.display = 'none';
                        successMessage.style.display = 'block';
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        alert('Hubo un error al enviar el formulario. Por favor, intentá nuevamente.');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Hubo un error al enviar el formulario. Por favor, intentá nuevamente.');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                });
                */
            }, 2000);
            
            return false;
        });
    }
    
    // Función de validación
    function validateForm(form) {
        let isValid = true;
        
        // Limpiar mensajes de error previos
        form.querySelectorAll('.error-message').forEach(msg => msg.remove());
        form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.classList.remove('error');
        });
        
        // Validar campos requeridos
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'Este campo es obligatorio');
                isValid = false;
            }
        });
        
        // Validar emails
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !isValidEmail(field.value)) {
                showError(field, 'Email inválido');
                isValid = false;
            }
        });
        
        // Validar teléfonos
        const phoneFields = form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            if (field.value && !isValidPhone(field.value)) {
                showError(field, 'Teléfono inválido');
                isValid = false;
            }
        });
        
        // Validar checkboxes requeridos
        const requiredCheckboxes = form.querySelectorAll('input[type="checkbox"][required]');
        requiredCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                showError(checkbox.parentElement, 'Debes aceptar los términos');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function showError(field, message) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (field.classList.contains('form-input') || field.classList.contains('form-textarea')) {
            field.parentElement.appendChild(errorDiv);
        } else {
            field.appendChild(errorDiv);
        }
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[\d\s\(\)\-\+]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    // ==================== SMOOTH SCROLL A FORMULARIO ====================
    const scrollToFormLinks = document.querySelectorAll('a[href="#contacto-form"]');
    
    scrollToFormLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('contacto-form');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
});

// ==================== ESTILOS ADICIONALES PARA ERRORES ====================
const style = document.createElement('style');
style.textContent = `
    .form-input.error,
    .form-textarea.error {
        border-color: #e74c3c;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    .error-message::before {
        content: "⚠";
        font-size: 1rem;
    }
    
    .checkbox-label.error {
        color: #e74c3c;
    }
`;
document.head.appendChild(style);
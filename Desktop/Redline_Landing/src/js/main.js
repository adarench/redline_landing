// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Sticky CTA bar
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta) {
    window.addEventListener('scroll', function() {
      // Show sticky CTA after scrolling 50% of the viewport height
      if (window.scrollY > window.innerHeight * 0.5) {
        stickyCta.classList.remove('d-none');
      } else {
        stickyCta.classList.add('d-none');
      }
    });
  }
  
  // Form submission handling
  const ctaForm = document.querySelector('.cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (!isValidEmail(email)) {
        showFormError(emailInput, 'Please enter a valid email address.');
        return;
      }
      
      // Here you would typically send the data to your backend
      // For now, we'll just show a success message
      this.innerHTML = '<div class="alert alert-success">Thanks for signing up! We\'ll be in touch soon.</div>';
    });
  }
  
  // Utility function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Show form validation error
  function showFormError(inputElement, message) {
    // Remove any existing error messages
    const existingError = inputElement.parentNode.querySelector('.text-danger');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error class to input
    inputElement.classList.add('is-invalid');
    
    // Create and append error message
    const errorElement = document.createElement('div');
    errorElement.className = 'text-danger mt-2 small';
    errorElement.textContent = message;
    inputElement.parentNode.appendChild(errorElement);
    
    // Focus the input
    inputElement.focus();
    
    // Remove error when input changes
    inputElement.addEventListener('input', function() {
      this.classList.remove('is-invalid');
      const errorMsg = this.parentNode.querySelector('.text-danger');
      if (errorMsg) {
        errorMsg.remove();
      }
    }, { once: true });
  }
  
  // Add some subtle animations for risk highlight elements
  document.querySelectorAll('.feature-list li').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Initialize tooltips if using Bootstrap's tooltip component
  try {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  } catch (e) {
    console.log('Bootstrap tooltip not initialized:', e);
  }
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.classList.add('lazyload');
    img.setAttribute('data-src', img.src);
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  });
}
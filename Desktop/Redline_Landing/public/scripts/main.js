document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on initial load

    // Smooth scrolling for internal links
    document.querySelectorAll('.scrollto').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Bootstrap components
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    // Activate scrollspy
    document.body.setAttribute('data-bs-spy', 'scroll');
    document.body.setAttribute('data-bs-target', '#navbar');
    document.body.setAttribute('data-bs-offset', '100');
    
    // Show sticky CTA when scrolled 50% down
    const stickyCta = document.getElementById('sticky-cta');
    
    function handleStickyCta() {
        const scrollPosition = window.scrollY;
        const totalHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > (totalHeight - windowHeight) * 0.5 && !sessionStorage.getItem('ctaDismissed')) {
            stickyCta.classList.remove('d-none');
            stickyCta.classList.add('show');
        } else {
            stickyCta.classList.remove('show');
            setTimeout(() => {
                if (!stickyCta.classList.contains('show')) {
                    stickyCta.classList.add('d-none');
                }
            }, 300);
        }
    }

    window.addEventListener('scroll', handleStickyCta);

    // Close sticky CTA when clicking dismiss button
    const closeButton = document.querySelector('#sticky-cta .btn-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            stickyCta.classList.remove('show');
            setTimeout(() => {
                stickyCta.classList.add('d-none');
            }, 300);
            sessionStorage.setItem('ctaDismissed', 'true');
        });
    }

    // Form validation and submission
    const form = document.getElementById('early-access-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formElements = form.elements;
            let valid = true;
            
            // Validate each input
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                if (element.tagName === 'INPUT' && element.hasAttribute('required')) {
                    if (!element.value) {
                        element.classList.add('is-invalid');
                        valid = false;
                    } else if (element.type === 'email' && !validateEmail(element.value)) {
                        element.classList.add('is-invalid');
                        valid = false;
                    } else {
                        element.classList.remove('is-invalid');
                    }
                }
            }
            
            if (valid) {
                // Animation for submit button
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(function() {
                    form.reset();
                    submitButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(function() {
                        submitButton.innerHTML = '<span class="d-none d-md-inline">Get Access</span><i class="fas fa-arrow-right d-inline d-md-none"></i>';
                        submitButton.disabled = false;
                        
                        // Show success message
                        const successMessage = document.querySelector('.form-success-message');
                        successMessage.classList.remove('d-none');
                        
                        // Hide success message after 5 seconds
                        setTimeout(function() {
                            successMessage.classList.add('d-none');
                        }, 5000);
                    }, 1000);
                }, 1500);
            }
        });
        
        // Input event listeners to clear validation as user types
        const formInputs = form.querySelectorAll('input[required]');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value) {
                    if (this.type === 'email' && !validateEmail(this.value)) {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                    }
                }
            });
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Responsive design adjustments
    function handleResponsiveAdjustments() {
        if (window.innerWidth < 768) {
            // Mobile-specific adjustments
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.setAttribute('data-aos-delay', '50'); // Reduce delay on mobile
            });
        }
    }
    
    handleResponsiveAdjustments();
    window.addEventListener('resize', handleResponsiveAdjustments);
    
    // Add animation to counters if they exist
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const steps = 50;
        const stepValue = target / steps;
        const stepTime = duration / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += stepValue;
            if (current > target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, stepTime);
    });
    
    // Custom animation for the hero section
    const heroElements = document.querySelectorAll('#hero h1, #hero p, #hero .hero-cta');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in');
        }, 300 * index);
    });
    
    // Interactive elements for dashboard preview
    const dashboardCard = document.querySelector('.dashboard-card');
    if (dashboardCard) {
        const contractItems = dashboardCard.querySelectorAll('.contract-item');
        contractItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }
});
// Form handling with Firebase
document.addEventListener('DOMContentLoaded', function() {
    // Check if the early access form exists
    const form = document.getElementById('early-access-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            // Validate inputs
            if (!nameInput.value || !emailInput.value) {
                console.error('Name and email are required');
                return;
            }
            
            // Animation for submit button
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
            submitButton.disabled = true;
            
            // Get Firestore database
            const db = firebase.firestore();
            
            // Save form data to Firestore
            db.collection('earlyAccess').add({
                name: nameInput.value,
                email: emailInput.value,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                // Show success message
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
            })
            .catch((error) => {
                console.error("Error saving form data: ", error);
                submitButton.innerHTML = 'Error! Try Again';
                submitButton.disabled = false;
            });
        });
    }
});
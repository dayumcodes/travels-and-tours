// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Booking Tabs Functionality
    const bookingTabs = document.querySelectorAll('.booking-tab');
    const bookingForms = document.querySelectorAll('.booking-form');

    if (bookingTabs.length > 0 && bookingForms.length > 0) {
        bookingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and forms
                bookingTabs.forEach(t => t.classList.remove('active'));
                bookingForms.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get the tab data attribute
                const tabId = this.getAttribute('data-tab');
                
                // Show the corresponding form
                const activeForm = document.getElementById(`${tabId}-form`);
                if (activeForm) {
                    activeForm.classList.add('active');
                }
            });
        });
    }

    // City Slider Functionality
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const citySlider = document.querySelector('.city-slider');

    if (prevBtn && nextBtn && citySlider) {
        // Calculate the width of a single card plus its margin
        const cardWidth = 320; // 300px width + 20px margin
        
        // Get total number of cards and calculate total width
        const cards = citySlider.querySelectorAll('.city-card');
        const totalCards = cards.length;
        const totalWidth = totalCards * cardWidth;

        nextBtn.addEventListener('click', function() {
            // Check if we're at or near the end
            if (citySlider.scrollLeft + citySlider.clientWidth >= citySlider.scrollWidth - cardWidth) {
                // Loop back to the beginning with smooth animation
                citySlider.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                // Normal scroll to next card
                citySlider.scrollLeft += cardWidth;
            }
        });

        prevBtn.addEventListener('click', function() {
            // Check if we're at or near the beginning
            if (citySlider.scrollLeft <= cardWidth) {
                // Loop to the end with smooth animation
                citySlider.scrollTo({
                    left: totalWidth,
                    behavior: 'smooth'
                });
            } else {
                // Normal scroll to previous card
                citySlider.scrollLeft -= cardWidth;
            }
        });
    }

    // Testimonial Auto Scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        let scrollAmount = 0;
        const testimonialWidth = 530; // 500px width + 30px margin
        const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
        
        // Auto scroll every 5 seconds
        setInterval(() => {
            scrollAmount += testimonialWidth;
            
            // Reset scroll position when reaching the end
            if (scrollAmount > maxScroll) {
                scrollAmount = 0;
            }
            
            testimonialSlider.scrollLeft = scrollAmount;
        }, 5000);
    }

    // Partners Logo Slider
    const partnersSlider = document.querySelector('.partners-slider');
    
    if (partnersSlider) {
        // Auto scroll partners logos
        let partnersScrollAmount = 0;
        const partnerLogoWidth = 200; // Approximate width of each partner logo
        const partnersMaxScroll = partnersSlider.scrollWidth - partnersSlider.clientWidth;
        
        // Only auto-scroll if there are enough logos to scroll
        if (partnersMaxScroll > 0) {
            setInterval(() => {
                partnersScrollAmount += partnerLogoWidth;
                
                // Reset scroll position when reaching the end
                if (partnersScrollAmount > partnersMaxScroll) {
                    partnersScrollAmount = 0;
                }
                
                partnersSlider.scrollLeft = partnersScrollAmount;
            }, 3000);
        }
    }

    // Date Picker Initialization
    const datePickers = document.querySelectorAll('input[type="date"]');
    
    if (datePickers.length > 0) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        
        datePickers.forEach(picker => {
            picker.setAttribute('min', today);
            
            // If it's a check-out date, set min date to check-in date when check-in changes
            if (picker.id === 'check-out') {
                const checkInPicker = document.getElementById('check-in');
                
                if (checkInPicker) {
                    checkInPicker.addEventListener('change', function() {
                        picker.setAttribute('min', this.value);
                        
                        // If current check-out date is before new check-in date, update it
                        if (picker.value && picker.value < this.value) {
                            picker.value = this.value;
                        }
                    });
                }
            }
        });
    }

    // Form Validation
    const bookingFormElements = document.querySelectorAll('.booking-form');
    
    if (bookingFormElements.length > 0) {
        bookingFormElements.forEach(form => {
            const submitBtn = form.querySelector('.btn-search');
            
            if (submitBtn) {
                submitBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get all required fields
                    const requiredFields = form.querySelectorAll('select, input');
                    let isValid = true;
                    let firstInvalidField = null;
                    
                    requiredFields.forEach(field => {
                        if (!field.value) {
                            isValid = false;
                            field.style.borderColor = 'var(--danger-color)';
                            
                            if (!firstInvalidField) {
                                firstInvalidField = field;
                            }
                        } else {
                            field.style.borderColor = '#ddd';
                        }
                    });
                    
                    if (isValid) {
                        // In a real application, this would submit the form or make an API call
                        alert('Your search has been submitted! In a real application, this would show search results.');
                    } else {
                        // Focus on the first invalid field
                        if (firstInvalidField) {
                            firstInvalidField.focus();
                        }
                        
                        alert('Please fill in all fields to search.');
                    }
                });
            }
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                alert(`Thank you for subscribing with: ${email}\nYou would receive a confirmation email in a real application.`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add animation to cards on scroll
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.city-card, .deal-card, .category-card, .feature-card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize card animations
    const initCardAnimations = () => {
        const cards = document.querySelectorAll('.city-card, .deal-card, .category-card, .feature-card');
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Trigger animation on initial load
        animateOnScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', animateOnScroll);
    };

    // Currency Selector Functionality
    const currencySelect = document.querySelector('.currency-select');
    
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            const selectedCurrency = this.value;
            alert(`Currency changed to ${selectedCurrency}. In a real application, this would update all prices.`);
        });
    }

    // Initialize animations after a short delay to ensure DOM is fully loaded
    setTimeout(initCardAnimations, 100);
}); 
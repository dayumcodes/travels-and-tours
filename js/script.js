// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }

    // City Slider Functionality
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const citySlider = document.querySelector('.city-slider');

    if (prevBtn && nextBtn && citySlider) {
        // Calculate the width of a single card plus its margin
        const cardWidth = 320; // 300px width + 20px margin

        nextBtn.addEventListener('click', function() {
            citySlider.scrollLeft += cardWidth;
        });

        prevBtn.addEventListener('click', function() {
            citySlider.scrollLeft -= cardWidth;
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

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that point to an ID on the page
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        nav.style.display = 'none';
                    }
                }
            }
        });
    });

    // Search Box Functionality (Placeholder for now)
    const searchBox = document.querySelector('.search-box button');
    
    if (searchBox) {
        searchBox.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-box input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                alert(`You searched for: ${searchTerm}\nThis would redirect to search results in a real application.`);
            } else {
                alert('Please enter a destination to search.');
            }
        });
    }

    // Newsletter Form Submission (Placeholder)
    const newsletterForm = document.querySelector('.newsletter form');
    
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
        const cards = document.querySelectorAll('.city-card, .tour-card');
        
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
        const cards = document.querySelectorAll('.city-card, .tour-card');
        
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

    // Initialize animations after a short delay to ensure DOM is fully loaded
    setTimeout(initCardAnimations, 100);
}); 
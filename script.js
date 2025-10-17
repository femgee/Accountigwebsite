// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Navigation click handler
    navLinks.forEach(link => { 
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target page
            const targetPage = this.getAttribute('data-page');

            // Update active page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });

            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Testimonials Carousel
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialNav = document.getElementById('testimonialNav');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');

    let currentIndex = 0;
    const cardCount = testimonialCards.length;

    // Create dots for navigation
    for (let i = 0; i < cardCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        testimonialNav.appendChild(dot);
    }

    const dots = document.querySelectorAll('.testimonial-dot');

    // Function to go to a specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Function to update carousel position
    function updateCarousel() {
        testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Next slide function
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel();
    }

    // Previous slide function
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateCarousel();
    }

    // Event listeners for buttons
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    testimonialsTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    testimonialsTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Touch swipe support for mobile
    let startX = 0;
    let endX = 0;

    testimonialsTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    testimonialsTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;

        if (startX - endX > swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
        } else if (endX - startX > swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
});
// Enhanced Testimonials Carousel
function initTestimonialsCarousel() {
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialNav = document.getElementById('testimonialNav');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    let currentIndex = 0;
    const cardCount = testimonialCards.length;
    let slideInterval;
    let isAnimating = false;

    // Create dots for navigation
    function createDots() {
        testimonialNav.innerHTML = '';
        for (let i = 0; i < cardCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            testimonialNav.appendChild(dot);
        }
    }

    // Create progress bar
    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'testimonial-progress';
        progressBar.innerHTML = '<div class="testimonial-progress-bar"></div>';
        testimonialNav.parentNode.insertBefore(progressBar, testimonialNav.nextSibling);
        return progressBar.querySelector('.testimonial-progress-bar');
    }

    const progressBar = createProgressBar();
    createDots();
    const dots = document.querySelectorAll('.testimonial-dot');

    // Function to go to a specific slide
    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        
        isAnimating = true;
        currentIndex = index;
        updateCarousel();
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    // Function to update carousel position
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        testimonialsTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });

        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${((currentIndex + 1) / cardCount) * 100}%`;
        }

        // Add animation class for entrance effect
        testimonialCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.animation = 'slideIn 0.6s ease-out';
            }
        });
    }

    // Next slide function
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % cardCount;
        goToSlide(nextIndex);
    }

    // Previous slide function
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + cardCount) % cardCount;
        goToSlide(prevIndex);
    }

    // Event listeners for buttons
    prevButton.addEventListener('click', () => {
        if (!isAnimating) prevSlide();
        resetAutoAdvance();
    });

    nextButton.addEventListener('click', () => {
        if (!isAnimating) nextSlide();
        resetAutoAdvance();
    });

    // Auto-advance slides every 5 seconds
    function startAutoAdvance() {
        slideInterval = setInterval(() => {
            if (!isAnimating) nextSlide();
        }, 5000);
    }

    function resetAutoAdvance() {
        clearInterval(slideInterval);
        startAutoAdvance();
    }

    // Pause auto-advance on hover and focus
    function pauseAutoAdvance() {
        clearInterval(slideInterval);
    }

    function resumeAutoAdvance() {
        startAutoAdvance();
    }

    testimonialsTrack.addEventListener('mouseenter', pauseAutoAdvance);
    testimonialsTrack.addEventListener('mouseleave', resumeAutoAdvance);
    testimonialsTrack.addEventListener('focusin', pauseAutoAdvance);
    testimonialsTrack.addEventListener('focusout', resumeAutoAdvance);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoAdvance();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoAdvance();
        }
    });

    // Touch swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    testimonialsTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        pauseAutoAdvance();
    });

    testimonialsTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    testimonialsTrack.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        const swipeThreshold = 50;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
        
        isDragging = false;
        resumeAutoAdvance();
    });

    // Initialize
    startAutoAdvance();
    updateCarousel();

    // Update on window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing navigation and form code here...
    
    // Initialize testimonials carousel
    initTestimonialsCarousel();
});

// Go to Top functionality - Fixed
function initGoToTop() {
    const goToTopButton = document.getElementById('goToTop');
    
    if (!goToTopButton) {
        console.error('Go to Top button not found!');
        return;
    }
    
    // Show/hide button based on scroll position
    function toggleGoToTopButton() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollPosition > 300) {
            goToTopButton.classList.add('visible');
        } else {
            goToTopButton.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top
    function scrollToTop() {
        try {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } catch (error) {
            // Fallback for older browsers
            document.documentElement.scrollTop = 0;
        }
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleGoToTopButton);
    goToTopButton.addEventListener('click', scrollToTop);
    
    // Keyboard accessibility
    goToTopButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Initialize button state
    toggleGoToTopButton();
    
    console.log('Go to Top button initialized successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGoToTop();
});
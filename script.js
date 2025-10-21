// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Testimonial Slider
const track = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function goToSlide(slideIndex) {
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    currentSlide = slideIndex;
    
    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'));
        goToSlide(slideIndex);
    });
});

// Auto slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}, 5000);

// Go to Top Button
const goTopBtn = document.querySelector('.go-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        goTopBtn.classList.add('active');
    } else {
        goTopBtn.classList.remove('active');
    }
});

goTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Observe about section for animation
const aboutSection = document.querySelector('.about-content');
aboutSection.style.opacity = '0';
aboutSection.style.transform = 'translateY(20px)';
aboutSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

aboutObserver.observe(aboutSection);

// Video background fallback for mobile devices
function handleVideoBackground() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Pause videos on mobile to save data and improve performance
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
    }
}

// Initialize video handling
document.addEventListener('DOMContentLoaded', handleVideoBackground);

// Video Background Handling
function initVideoBackgrounds() {
    const videos = document.querySelectorAll('.video-background video, .services-video-bg video');
    
    videos.forEach(video => {
        const container = video.parentElement;
        
        // Add loading class
        container.classList.add('video-loading');
        
        // Check if video can play
        video.addEventListener('canplay', function() {
            container.classList.remove('video-loading');
            container.classList.add('video-loaded');
            console.log('Video loaded successfully:', video.src);
        });
        
        // Handle video errors
        video.addEventListener('error', function() {
            console.error('Video failed to load:', video.src);
            container.classList.remove('video-loading');
            container.classList.remove('video-loaded');
            // Fallback image will be visible
        });
        
        // Force video to try to play (handles autoplay restrictions)
        video.play().catch(error => {
            console.log('Video autoplay prevented:', error);
            // Fallback will handle this case
        });
    });
}

// Alternative video sources in case primary fails
function setupVideoFallbacks() {
    const videoContainers = document.querySelectorAll('.video-background, .services-video-bg');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const sources = video.querySelectorAll('source');
        
        // If first source fails, try the second one
        if (sources.length > 1) {
            sources[0].addEventListener('error', function() {
                console.log('Primary video source failed, trying alternative...');
                video.load(); // Reload video with next source
            });
        }
    });
}

// Mobile video handling
function handleMobileVideos() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Add playsinline attribute for iOS
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            
            // Try to play with user interaction
            document.addEventListener('touchstart', function playVideos() {
                videos.forEach(vid => {
                    vid.play().catch(e => console.log('Mobile video play failed:', e));
                });
                document.removeEventListener('touchstart', playVideos);
            });
        });
    }
}

// Initialize all video functionality
function initVideos() {
    initVideoBackgrounds();
    setupVideoFallbacks();
    handleMobileVideos();
}

// Call this when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initVideos();
});

// Show back to top button when scrolling down
window.onscroll = function() {
    const btn = document.getElementById('topBtn');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
};

// Scroll to top when button is clicked
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('topBtn').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

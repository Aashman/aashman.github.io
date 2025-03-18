
// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year for copyright
  document.getElementById('current-year').textContent = new String(new Date().getFullYear());
  
  // Initialize skills bars animation
  initSkillBars();
  
  // Initialize scrolling effects
  initScrollEffects();
  
  // Initialize mobile menu
  initMobileMenu();
});

// Navbar scroll effect
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Trigger once on load
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  }
  
  // Handle hash links for smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Close mobile menu if open
      document.getElementById('mobile-menu').classList.remove('show');
      
      // Add offset for the fixed header
      const headerHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  menuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('show');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('show');
    }
  });
}

// Initialize skill bars with animation on scroll
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  
  // Animate each skill bar when it becomes visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.style.width;
        entry.target.style.width = '0';
        
        // Trigger animation after a small delay
        setTimeout(() => {
          entry.target.style.width = targetWidth;
        }, 200);
        
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe each skill bar
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

// Toggle experience details
function toggleExperience(id) {
  const details = document.getElementById(`details-${id}`);
  const icon = document.getElementById(`icon-${id}`);
  
  // Toggle the 'show' class on the details
  details.classList.toggle('show');
  
  // Toggle the 'active' class on the icon
  icon.classList.toggle('active');
}

// Contact form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form elements
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const loadingSpinner = document.getElementById('loading-spinner');
  const formSuccess = document.getElementById('form-success');
  
  // Show loading state
  submitText.classList.add('hidden');
  loadingSpinner.classList.remove('hidden');
  submitBtn.disabled = true;
  
  // Simulate form submission (1.5 second delay)
  setTimeout(() => {
    // Reset loading state
    submitText.classList.remove('hidden');
    loadingSpinner.classList.add('hidden');
    submitBtn.disabled = false;
    
    // Show success message
    form.reset();
    form.style.display = 'none';
    formSuccess.classList.remove('hidden');
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      formSuccess.classList.add('hidden');
      form.style.display = 'block';
    }, 5000);
  }, 1500);
  
  return false;
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

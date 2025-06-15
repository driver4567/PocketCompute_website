// For Debug
/*
(function(originalFetch) {
  window.fetch = function(...args) {
    const url = args[0];
    if (typeof url === 'string' && url.includes('site.webmanifest')) {
      console.log('Fetching webmanifest:', url);
      console.trace();
    }
    return originalFetch.apply(this, args);
  };
})(window.fetch);
*/

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Handlebars and translations
  window.i18n.initHandlebars();
  window.i18n.initLanguage();

  //To set initial transations on page load, if language is different to default
  // Initialize translation elements (data-translation, data-translation-placeholder, data-translation-alt)
  //initializeTranslations();
  // Set up event listeners for language changes and buttons
  initializeEvents();
  // Update translations when language changes
  //document.addEventListener('language-changed', initializeTranslations);
  document.addEventListener('language-changed', window.i18n.renderTemplates);

  
  // Initialize animations
  initAnimations();
  
  // Initialize UI components
  initMobileMenu();
  initLanguageSelector();
  initFunctionTabs();
  initScrollEffects();
  initModals();
  initNewsletterForm();
  initAccordion();
  initVideoModal();
});


// Animation functions
function initAnimations() {
  // Define elements to animate
  const animatedElements = [
    { selector: '.hero-content', animation: 'slide-left', delay: 0 },
    { selector: '.hero-image-container', animation: 'slide-right', delay: 0 },
    { selector: '.hero-discount', animation: 'fade-in', delay: 300 },
    { selector: '.section-header', animation: 'slide-up', delay: 0 },
    { selector: '.feature-card', animation: 'slide-up', delay: 100, staggered: true },
    { selector: '.function-tabs', animation: 'slide-up', delay: 0 },
    { selector: '.function-content', animation: 'fade-in', delay: 200 },
    { selector: '.newsletter-container', animation: 'slide-up', delay: 0 },
    { selector: '.cta', animation: 'fade-in', delay: 0 }
  ];
  
  // Observer callback function
  const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Calculate delay for staggered animations
        const baseDelay = entry.target.dataset.animationDelay || 0;
        const staggerDelay = entry.target.dataset.staggerIndex ? entry.target.dataset.staggerIndex * 100 : 0;
        const totalDelay = parseInt(baseDelay) + staggerDelay;
        
        // Apply animation after delay
        setTimeout(() => {
          entry.target.classList.add(entry.target.dataset.animation);
        }, totalDelay);
        
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Create intersection observer
  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  
  // Set up each animation
  animatedElements.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    
    elements.forEach((element, index) => {
      // Add animation classes and data attributes
      element.classList.add('opacity-0');
      element.dataset.animation = item.animation;
      element.dataset.animationDelay = item.delay;
      
      // For staggered animations
      if (item.staggered) {
        element.dataset.staggerIndex = index;
      }
      
      // Start observing
      observer.observe(element);
    });
  });
}

// Mobile menu
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      
      // Update aria-expanded attribute
      const isExpanded = navMenu.classList.contains('show');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      
      // Update icon
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (isExpanded) {
          icon.className = 'fas fa-times';
          menuToggle.setAttribute('aria-label', window.i18n.getTranslation('navbar.closeMenu'));
        } else {
          icon.className = 'fas fa-bars';
          menuToggle.setAttribute('aria-label', window.i18n.getTranslation('navbar.openMenu'));
        }
      }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });
  }
}

// Language selector
function initLanguageSelector() {
  const languageSelector = document.querySelector('.language-selector');
  const languageToggle = document.querySelector('.language-dropdown-toggle');
  const languageOptions = document.querySelectorAll('.language-option');
  const currentLanguageSpan = document.querySelector('.current-language');
  
  if (languageSelector && languageToggle) {
    // Set initial language display
    const storedLang = localStorage.getItem('preferred_language') || window.i18n.getBrowserLanguage();
    const currentOption = document.querySelector(`.language-option[data-lang="${storedLang}"]`);
    if (currentOption) {
      currentLanguageSpan.innerHTML = currentOption.innerHTML;
    }
    
    // Toggle dropdown
    languageToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      languageSelector.classList.toggle('active');
    });
    
    // Handle language selection
    languageOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        const selectedLang = this.getAttribute('data-lang');
        currentLanguageSpan.innerHTML = this.innerHTML;
        languageSelector.classList.remove('active');
        
        // Change language using i18n
        window.i18n.setLanguage(selectedLang);
        // Store preference
        localStorage.setItem('preferred_language', selectedLang);
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      languageSelector.classList.remove('active');
    });
  }
}

// Function tabs
function initFunctionTabs() {
  const tabs = document.querySelectorAll('.function-tab');
  const contents = document.querySelectorAll('.function-content');
  
  if (tabs.length && contents.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        // Add active class to selected tab
        tab.classList.add('active');
        
        // Show corresponding content
        const contentId = tab.getAttribute('data-tab');
        const content = document.getElementById(contentId);
        if (content) {
          content.classList.add('active');
        }
      });
    });
  }
}

// Scroll effects
function initScrollEffects() {
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Modal handling
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  
  // Open modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Set focus to close button
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
          setTimeout(() => {
            closeButton.focus();
          }, 100);
        }
      }
    });
  });
  
  // Close modal with close button
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  });
  
  // Close modal when clicking on overlay
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  });
  
  // Close modal with ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const visibleModal = document.querySelector('.modal-overlay.show');
      if (visibleModal) {
        visibleModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
      }
    }
  });
}

// Newsletter form handling
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validate form data
      let isValid = true;
      
      // Name validation
      const nameInput = form.querySelector('[name="name"]');
      const nameError = form.querySelector('[data-error="name"]');
      
      if (!name || name.trim() === '') {
        isValid = false;
        nameInput.classList.add('error');
        nameError.classList.add('show');
        nameError.textContent = window.i18n.getTranslation('newsletter.validation.nameRequired');
      } else {
        nameInput.classList.remove('error');
        nameError.classList.remove('show');
      }
      
      // Email validation
      const emailInput = form.querySelector('[name="email"]');
      const emailError = form.querySelector('[data-error="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email || !emailRegex.test(email.trim())) {
        isValid = false;
        emailInput.classList.add('error');
        emailError.classList.add('show');
        emailError.textContent = window.i18n.getTranslation('newsletter.validation.emailInvalid');
      } else {
        emailInput.classList.remove('error');
        emailError.classList.remove('show');
      }
      
      // If form is valid, submit it
      if (isValid) {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = window.i18n.getTranslation('newsletter.form.submitting');
        submitButton.disabled = true;

        // Submit to Google form

        // Google Form's formResponse URL
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScZOA5Gs8eX29u0IQ08mF-2TfeLA6kurVYVnSKCVDD8yXdIEg/formResponse';
        
        // Replace with actual entry IDs from your Google Form
        const formData = new FormData();
        formData.append('entry.2005620554', name.trim());   // entry ID for Name
        formData.append('entry.1045781291', email.trim());  // entry ID for Email
        
        // Send POST request to Google Form
        fetch(googleFormUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'no-cors', // Important to avoid CORS errors
          body: formData
        }).then(() => {
          form.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;

          showToast('success',
            window.i18n.getTranslation('newsletter.success.title'),
            window.i18n.getTranslation('newsletter.success.message')
          );
        }).catch(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          showToast('error', 'Error', 'There was a problem submitting the form.');
        });
      }
    });
  }
}

// Toast notification function
function showToast(type, title, message) {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Create toast content
  let icon = '';
  switch(type) {
    case 'success':
      icon = '<i class="fas fa-check-circle"></i>';
      break;
    case 'error':
      icon = '<i class="fas fa-exclamation-circle"></i>';
      break;
    case 'info':
      icon = '<i class="fas fa-info-circle"></i>';
      break;
    case 'warning':
      icon = '<i class="fas fa-exclamation-triangle"></i>';
      break;
  }
  
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <div class="toast-close"><i class="fas fa-times"></i></div>
  `;
  
  // Add toast to container
  toastContainer.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 50);
  
  // Add close functionality
  const closeButton = toast.querySelector('.toast-close');
  closeButton.addEventListener('click', () => {
    toast.classList.remove('show');
    
    // Remove toast after animation
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  });
  
  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    
    // Remove toast after animation
    setTimeout(() => {
      if (toast.parentNode === toastContainer) {
        toastContainer.removeChild(toast);
      }
    }, 300);
  }, 5000);
}

// Animation utility functions
function parallaxEffect() {
  const elements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    elements.forEach(element => {
      const speed = element.dataset.speed || 0.1;
      const offset = scrollY * speed;
      
      element.style.transform = `translateY(${offset}px)`;
    });
  });
}

// Scroll reveal function (alternative to intersection observer)
function scrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  
  function checkVisibility() {
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;
    
    elements.forEach(element => {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const elementBottom = elementTop + elementHeight;
      
      // Check if element is in viewport
      if (elementBottom > windowTop && elementTop < windowBottom) {
        element.classList.add('revealed');
      }
    });
  }
  
  // Check on scroll and on load
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  checkVisibility();
}

// Accordion functionality for FAQ section
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  if (accordionHeaders.length) {
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionId = header.getAttribute('data-accordion');
        const accordionContent = document.getElementById(accordionId);
        
        // Toggle active class
        accordionItem.classList.toggle('active');
        
        // Set proper aria attributes
        const isExpanded = accordionItem.classList.contains('active');
        header.setAttribute('aria-expanded', isExpanded);
        
        // Close other accordion items if this one is opened
        if (isExpanded) {
          accordionHeaders.forEach(otherHeader => {
            if (otherHeader !== header) {
              const otherItem = otherHeader.parentElement;
              otherItem.classList.remove('active');
              otherHeader.setAttribute('aria-expanded', 'false');
            }
          });
        }
      });
    });
    
    // Open first accordion item by default
    if (accordionHeaders.length > 0) {
      const firstItem = accordionHeaders[0].parentElement;
      firstItem.classList.add('active');
      accordionHeaders[0].setAttribute('aria-expanded', 'true');
    }
  }
}

// Video modal functionality
function initVideoModal() {
  // Create video modal if it doesn't exist
  const videoModalExists = document.getElementById('video-modal');
  if (!videoModalExists) {
    //removed
  }
  
  // Update animation elements for new sections
  const newAnimatedElements = [
    { selector: '.video-container', animation: 'fade-in', delay: 0 },
    { selector: '.instagram-action', animation: 'fade-in', delay: 200 },
    { selector: '.about-image', animation: 'slide-left', delay: 0 },
    { selector: '.about-text', animation: 'slide-right', delay: 0 },
    { selector: '.accordion', animation: 'slide-up', delay: 0 }
  ];
  
  // Set up animation for these new elements
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Calculate delay
        const baseDelay = entry.target.dataset.animationDelay || 0;
        const staggerDelay = entry.target.dataset.staggerIndex ? entry.target.dataset.staggerIndex * 100 : 0;
        const totalDelay = parseInt(baseDelay) + staggerDelay;
        
        // Apply animation after delay
        setTimeout(() => {
          entry.target.classList.add(entry.target.dataset.animation);
        }, totalDelay);
        
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  
  // Set up each animation
  newAnimatedElements.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    
    elements.forEach((element, index) => {
      // Add animation classes and data attributes
      element.classList.add('opacity-0');
      element.dataset.animation = item.animation;
      element.dataset.animationDelay = item.delay;
      
      // For staggered animations
      if (item.staggered) {
        element.dataset.staggerIndex = index;
      }
      
      // Start observing
      observer.observe(element);
    });
  });
}
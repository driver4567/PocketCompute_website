document.addEventListener('DOMContentLoaded', function() {
  // Initialize translation elements after i18n is loaded
  initializeTranslations();
  
  // Update translations when language changes
  document.addEventListener('language-changed', initializeTranslations);
});

// Update all elements with translation attributes
function initializeTranslations() {
  // Update text content for elements with data-translation attribute
  updateTextTranslations();
  
  // Update placeholders for inputs with data-translation-placeholder attribute
  updatePlaceholderTranslations();
  
  // Update alt text for images with data-translation-alt attribute
  updateAltTranslations();
}

// Update text content translations
function updateTextTranslations() {
  const elements = document.querySelectorAll('[data-translation]');
  
  elements.forEach(element => {
    const translationKey = element.getAttribute('data-translation');
    const translatedText = window.i18n.getTranslation(translationKey);
    
    if (translatedText) {
      element.innerHTML = translatedText;
    }
  });
}

// Update placeholder translations
function updatePlaceholderTranslations() {
  const elements = document.querySelectorAll('[data-translation-placeholder]');
  
  elements.forEach(element => {
    const translationKey = element.getAttribute('data-translation-placeholder');
    const translatedText = window.i18n.getTranslation(translationKey);
    
    if (translatedText) {
      element.setAttribute('placeholder', translatedText);
    }
  });
}

// Update alt text translations
function updateAltTranslations() {
  const elements = document.querySelectorAll('[data-translation-alt]');
  
  elements.forEach(element => {
    const translationKey = element.getAttribute('data-translation-alt');
    const translatedText = window.i18n.getTranslation(translationKey);
    
    if (translatedText) {
      element.setAttribute('alt', translatedText);
    }
  });
}

// Update document title
function updateDocumentTitle() {
  document.title = window.i18n.getTranslation('meta.title');
}

// Custom event for language changes
function createLanguageChangedEvent() {
  // Create a custom event for when language changes
  const languageChangedEvent = new CustomEvent('language-changed');
  
  // Add trigger in the setLanguage function
  const originalSetLanguage = window.i18n.setLanguage;
  
  window.i18n.setLanguage = function(langCode) {
    const result = originalSetLanguage(langCode);
    
    if (result) {
      // Trigger the custom event
      document.dispatchEvent(languageChangedEvent);
      
      // Update document title
      updateDocumentTitle();
    }
    
    return result;
  };
}

// Initialize event handling
function initializeEvents() {
  createLanguageChangedEvent();
  
  // Set up language buttons in footer
  const languageButtons = document.querySelectorAll('.language-options button');
  
  languageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const langCode = button.getAttribute('data-lang');
      if (langCode) {
        window.i18n.setLanguage(langCode);
      }
    });
  });
}

// Add initialization to DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeEvents();
});
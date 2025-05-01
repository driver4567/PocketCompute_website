# PocketCompute Landing Page (Simplified Version)

This is a simplified version of the PocketCompute landing page using HTML, CSS, and JavaScript with Handlebars.js for internationalization.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Animated elements with scroll-based triggers
- Internationalization with Handlebars.js (supports English, German, French, Japanese, and Spanish)
- Form validation and submission handling
- Modal windows for legal documents (Terms of Service, Privacy Policy, Cookie Policy)
- Toast notification system

## Directory Structure

```
Output2/
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── i18n.js            # Internationalization setup and translations
│   ├── translations.js    # Translation utility functions
│   ├── modals.js          # Modal content and functionality
│   └── main.js            # Main JavaScript functionality
├── index.html             # Main HTML file
└── README.md              # This documentation file
```

## Getting Started

Simply open the `index.html` file in a web browser to view the landing page.

## How It Works

### Internationalization

The site uses Handlebars.js for templating and internationalization. Language files are stored in the `i18n.js` file as JavaScript objects.

- User can change languages from the dropdown in the header
- Language preference is stored in localStorage
- Browser language is detected and used as the default if no preference is stored

### Form Handling

The newsletter signup form includes client-side validation and simulates a form submission:

1. Validates required fields and email format
2. Shows validation errors if needed
3. Simulates an API call (with timeout)
4. Shows success/error toast notification

### Animations

Animations are triggered as elements scroll into view using the Intersection Observer API.

### Modals

Legal document modals (Privacy Policy, Terms of Service, Cookie Policy) are loaded dynamically and can be opened by clicking the corresponding links in the footer.

## Using with a Backend

To connect this to a backend:

1. Update the newsletter form submission in `main.js` to make a real API call instead of the simulated timeout
2. Make sure to handle CORS if your backend is on a different domain
3. Add proper error handling for API calls

## Credits

- Font Awesome for icons
- Google Fonts for the Inter font family
- Handlebars.js for templating
- Unsplash for sample images
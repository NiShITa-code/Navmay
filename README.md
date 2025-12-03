# Navamay - Healthcare Innovation Website

A modern, responsive website for Navamay, a healthcare technology company building innovative products.

## Features

- **Modern Design**: Clean, professional healthcare-focused design with smooth animations
- **Responsive**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Product Showcase**: Features ClinicBot, an AI-powered doctor appointment booking system
- **Waitlist Functionality**: Email collection system for the ClinicBot product launch
- **Smooth Navigation**: Smooth scrolling between sections

## Products

### ClinicBot
AI-powered doctor appointment booking through WhatsApp with an integrated dashboard for healthcare providers. Currently in development with a waitlist feature for early access.

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Google Fonts (Inter)

## How to View

Simply open `index.html` in a web browser to view the website.

Alternatively, you can serve it using a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Waitlist Feature

The waitlist functionality currently stores emails in localStorage for demonstration purposes. In a production environment, you would:

1. Set up a backend API endpoint to receive and store emails
2. Update the `handleWaitlistSubmit()` function in `script.js` to send data to your backend
3. Consider using a service like:
   - Mailchimp API
   - SendGrid
   - Custom backend with database storage

### Accessing Stored Emails

To view collected emails during development, open the browser console and type:
```javascript
JSON.parse(localStorage.getItem('waitlistEmails'))
```

## Customization

### Colors
Main colors are defined as CSS variables in `styles.css`:
- `--primary-color`: Main brand color (blue)
- `--secondary-color`: Secondary brand color (darker blue)
- `--accent-color`: Accent color for highlights

### Content
- Update company information in `index.html`
- Add more products by duplicating the `.product-card` section
- Modify contact email in the Contact section

## Future Enhancements

- Backend integration for email collection
- Newsletter signup
- Blog section
- Testimonials section
- Additional product pages
- Contact form
- Analytics integration

## License

Copyright © 2024 Navamay. All rights reserved.

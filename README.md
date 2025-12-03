# Navamay - Healthcare Innovation Platform

A modern, production-ready React application for Navamay, a healthcare technology company building innovative products like CliniqBot.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.3.1-purple)
![License](https://img.shields.io/badge/License-Proprietary-red)

## 🚀 Features

- **Modern React Architecture**: Built with React 18.3 and Vite for optimal performance
- **Responsive Design**: Mobile-first design that works on all devices
- **Production Ready**: Optimized builds, code splitting, and environment configuration
- **Backend Integration**: Ready-to-connect API layer for waitlist management
- **Beautiful UI**: Following modern design principles with smooth animations
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility

## 📦 Products

### CliniqBot
AI-powered doctor appointment booking through WhatsApp with an integrated dashboard for healthcare providers. Features include:
- WhatsApp integration for easy booking
- AI-powered scheduling system
- Doctor dashboard for practice management
- Real-time notifications
- 24/7 availability

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.3.1
- **Styling**: CSS3 with CSS Modules
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Navmay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_WAITLIST_ENDPOINT=/waitlist
   VITE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

## 🏗️ Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist` folder with:
- Minified JavaScript and CSS
- Code splitting for better performance
- Source maps disabled for security
- Optimized assets

### Preview Production Build Locally

```bash
npm run preview
```

## 🚀 Production Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   In Vercel Dashboard → Settings → Environment Variables:
   ```
   VITE_API_URL=https://your-api.com/api
   VITE_WAITLIST_ENDPOINT=/waitlist
   VITE_ENV=production
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Set Environment Variables**
   In Netlify Dashboard → Site Settings → Environment Variables

### Option 3: AWS S3 + CloudFront

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Invalidate CloudFront cache**
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

### Option 4: Docker

1. **Create Dockerfile** (already included)

2. **Build Docker image**
   ```bash
   docker build -t navamay-web .
   ```

3. **Run container**
   ```bash
   docker run -p 80:80 navamay-web
   ```

## 🔌 Backend Integration

### Setting Up Backend API

The app is ready to connect to a backend API. You need to:

1. **Create a backend API** with the following endpoint:

   **POST** `/api/waitlist`
   ```json
   {
     "email": "user@example.com"
   }
   ```

   **Response:**
   ```json
   {
     "success": true,
     "message": "Successfully joined the waitlist",
     "data": {
       "email": "user@example.com",
       "timestamp": "2024-12-03T10:00:00Z",
       "id": "unique-id"
     }
   }
   ```

2. **Update environment variables** in `.env`:
   ```env
   VITE_API_URL=https://your-api-domain.com/api
   VITE_WAITLIST_ENDPOINT=/waitlist
   VITE_ENV=production
   ```

### Backend Example (Node.js/Express)

```javascript
// backend/server.js
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Waitlist endpoint
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email } = req.body

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email'
      })
    }

    // Save to database (MongoDB, PostgreSQL, etc.)
    // const result = await db.collection('waitlist').insertOne({ email, timestamp: new Date() })

    res.json({
      success: true,
      message: 'Successfully joined the waitlist'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

app.listen(5000, () => console.log('Server running on port 5000'))
```

### Alternative: Serverless Functions

You can also use serverless functions:

**Vercel Function** (`/api/waitlist.js`):
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  // Save to database
  // ...

  res.json({ success: true, message: 'Successfully joined the waitlist' })
}
```

**Netlify Function** (`/netlify/functions/waitlist.js`):
```javascript
exports.handler = async (event) => {
  const { email } = JSON.parse(event.body)

  // Save to database
  // ...

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: 'Successfully joined the waitlist' })
  }
}
```

## 📧 Email Service Integration

For production, integrate an email service to manage waitlist:

### Option 1: Mailchimp

```javascript
const mailchimp = require('@mailchimp/mailchimp_marketing')

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})

async function addToWaitlist(email) {
  const response = await mailchimp.lists.addListMember(LIST_ID, {
    email_address: email,
    status: 'subscribed',
  })
  return response
}
```

### Option 2: SendGrid

```javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendWelcomeEmail(email) {
  await sgMail.send({
    to: email,
    from: 'hello@navamay.com',
    subject: 'Welcome to CliniqBot Waitlist!',
    text: 'Thanks for joining our waitlist...',
  })
}
```

### Option 3: Custom Database

```javascript
// PostgreSQL Example
const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function addToWaitlist(email) {
  const result = await pool.query(
    'INSERT INTO waitlist (email, created_at) VALUES ($1, NOW()) RETURNING *',
    [email]
  )
  return result.rows[0]
}
```

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://api.navamay.com/api` |
| `VITE_WAITLIST_ENDPOINT` | Waitlist endpoint path | `/waitlist` |
| `VITE_ENV` | Environment mode | `production` |
| `VITE_GA_TRACKING_ID` | Google Analytics ID (optional) | `G-XXXXXXXXXX` |

## 📊 Viewing Waitlist Emails (Development)

In development mode, emails are stored in localStorage. To view them:

1. **Open browser console**
2. **Run:**
   ```javascript
   // View all emails
   JSON.parse(localStorage.getItem('waitlistEmails'))

   // Export to CSV
   const emails = JSON.parse(localStorage.getItem('waitlistEmails'))
   console.table(emails)
   ```

## 🎨 Customization

### Updating Colors

Edit `src/index.css`:
```css
:root {
  --primary-600: #2563eb;  /* Change primary color */
  --primary-700: #1d4ed8;  /* Change primary dark */
}
```

### Adding New Sections

1. Create component in `src/components/`
2. Import and add to `src/App.jsx`
3. Update navigation links in `Navbar.jsx`

### Modifying Content

- **Company Info**: Edit `src/components/About.jsx`
- **Products**: Edit `src/components/Products.jsx`
- **Contact**: Edit `src/components/Contact.jsx`

## 🧪 Testing

```bash
# Add testing library
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

## 📈 Performance Optimization

The app includes:
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Minification
- ✅ Tree shaking
- ✅ Image optimization ready
- ✅ Gzip compression (configure on server)

## 🔒 Security Considerations

- ✅ No sensitive data in client-side code
- ✅ Environment variables for API keys
- ✅ Input validation
- ✅ XSS protection
- ⚠️ Add CORS configuration on backend
- ⚠️ Add rate limiting on API endpoints
- ⚠️ Add HTTPS in production

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not working
- Ensure variables start with `VITE_`
- Restart dev server after changing `.env`

### API calls failing
- Check CORS configuration on backend
- Verify API_URL in environment variables
- Check browser console for errors

## 📝 License

Copyright © 2024 Navamay. All rights reserved.

## 👥 Support

For support, email info@navamay.com

---

**Built with ❤️ by the Navamay Team**
